// src/hooks/useProgress.js
import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook để theo dõi tiến độ học tập
 * @param {Array} flashCards - Danh sách flash cards
 * @returns {Object} - Progress data và functions
 */
export const useProgress = (flashCards = []) => {
  const [studyHistory, setStudyHistory] = useLocalStorage('study_history', []);
  const [dailyGoal, setDailyGoal] = useLocalStorage('daily_goal', 10);
  const [streak, setStreak] = useLocalStorage('study_streak', 0);
  const [lastStudyDate, setLastStudyDate] = useLocalStorage('last_study_date', null);

  // Tính toán tiến độ tổng quan
  const progressStats = useMemo(() => {
    const totalCards = flashCards.length;
    const learnedCards = flashCards.filter(card => card.isLearned).length;
    const progressPercentage = totalCards > 0 ? Math.round((learnedCards / totalCards) * 100) : 0;

    // Thống kê theo category
    const categoryStats = flashCards.reduce((acc, card) => {
      const category = card.category;
      if (!acc[category]) {
        acc[category] = { total: 0, learned: 0 };
      }
      acc[category].total++;
      if (card.isLearned) {
        acc[category].learned++;
      }
      return acc;
    }, {});

    return {
      totalCards,
      learnedCards,
      progressPercentage,
      categoryStats,
      remainingCards: totalCards - learnedCards
    };
  }, [flashCards]);

  // Thống kê hàng ngày
  const dailyStats = useMemo(() => {
    const today = new Date().toDateString();
    const todayHistory = studyHistory.filter(entry => 
      new Date(entry.date).toDateString() === today
    );

    const cardsStudiedToday = todayHistory.length;
    const dailyProgress = Math.min(Math.round((cardsStudiedToday / dailyGoal) * 100), 100);
    const isGoalReached = cardsStudiedToday >= dailyGoal;

    return {
      cardsStudiedToday,
      dailyProgress,
      isGoalReached,
      dailyGoal
    };
  }, [studyHistory, dailyGoal]);

  // Thống kê tuần
  const weeklyStats = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyHistory = studyHistory.filter(entry => 
      new Date(entry.date) >= oneWeekAgo
    );

    const weeklyCards = weeklyHistory.length;
    const dailyAverage = Math.round(weeklyCards / 7);

    // Tạo data cho biểu đồ 7 ngày
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toDateString();
      const dayHistory = studyHistory.filter(entry => 
        new Date(entry.date).toDateString() === dayStr
      );
      
      chartData.push({
        date: dayStr,
        day: date.getDate(),
        cards: dayHistory.length,
        dayName: date.toLocaleDateString('vi-VN', { weekday: 'short' })
      });
    }

    return {
      weeklyCards,
      dailyAverage,
      chartData
    };
  }, [studyHistory]);

  // Cập nhật streak
  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (!lastStudyDate) {
      // Lần đầu tiên học
      setStreak(1);
      setLastStudyDate(today);
    } else if (lastStudyDate === today) {
      // Đã học hôm nay rồi, không tăng streak
      return;
    } else if (lastStudyDate === yesterdayStr) {
      // Học liên tiếp, tăng streak
      setStreak(prev => prev + 1);
      setLastStudyDate(today);
    } else {
      // Bỏ lỡ ngày, reset streak
      setStreak(1);
      setLastStudyDate(today);
    }
  };

  // Record một lần study
  const recordStudy = (cardId, isCorrect, timeSpent = 0) => {
    const studyEntry = {
      cardId,
      date: new Date().toISOString(),
      isCorrect,
      timeSpent,
      timestamp: Date.now()
    };

    setStudyHistory(prev => [...prev, studyEntry]);
    updateStreak();
  };

  // Lấy performance theo thời gian
  const getPerformanceData = (days = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const periodHistory = studyHistory.filter(entry => 
      new Date(entry.date) >= startDate
    );

    const correctAnswers = periodHistory.filter(entry => entry.isCorrect).length;
    const totalAnswers = periodHistory.length;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    const averageTimeSpent = totalAnswers > 0 
      ? Math.round(periodHistory.reduce((sum, entry) => sum + (entry.timeSpent || 0), 0) / totalAnswers)
      : 0;

    return {
      accuracy,
      totalAnswers,
      correctAnswers,
      averageTimeSpent,
      period: days
    };
  };

  // Reset progress
  const resetProgress = () => {
    setStudyHistory([]);
    setStreak(0);
    setLastStudyDate(null);
  };

  // Lấy thống kê chi tiết của một card
  const getCardStats = (cardId) => {
    const cardHistory = studyHistory.filter(entry => entry.cardId === cardId);
    const totalAttempts = cardHistory.length;
    const correctAttempts = cardHistory.filter(entry => entry.isCorrect).length;
    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
    const lastStudied = cardHistory.length > 0 
      ? new Date(cardHistory[cardHistory.length - 1].date)
      : null;

    return {
      totalAttempts,
      correctAttempts,
      accuracy,
      lastStudied
    };
  };

  // Export dữ liệu để backup
  const exportProgressData = () => {
    return {
      studyHistory,
      dailyGoal,
      streak,
      lastStudyDate,
      exportDate: new Date().toISOString()
    };
  };

  // Import dữ liệu từ backup
  const importProgressData = (data) => {
    try {
      if (data.studyHistory) setStudyHistory(data.studyHistory);
      if (data.dailyGoal) setDailyGoal(data.dailyGoal);
      if (data.streak) setStreak(data.streak);
      if (data.lastStudyDate) setLastStudyDate(data.lastStudyDate);
      return true;
    } catch (error) {
      console.error('Error importing progress data:', error);
      return false;
    }
  };

  return {
    // Statistics
    progressStats,
    dailyStats,
    weeklyStats,
    streak,
    
    // Functions
    recordStudy,
    updateStreak,
    getPerformanceData,
    getCardStats,
    resetProgress,
    
    // Settings
    dailyGoal,
    setDailyGoal,
    
    // Data management
    exportProgressData,
    importProgressData,
    
    // Raw data
    studyHistory
  };
};

/**
 * Hook đơn giản để track session hiện tại
 */
export const useStudySession = () => {
  const [sessionData, setSessionData] = useState({
    startTime: null,
    cardsStudied: 0,
    correctAnswers: 0,
    totalTime: 0
  });

  const startSession = () => {
    setSessionData({
      startTime: Date.now(),
      cardsStudied: 0,
      correctAnswers: 0,
      totalTime: 0
    });
  };

  const recordAnswer = (isCorrect, timeSpent) => {
    setSessionData(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      totalTime: prev.totalTime + timeSpent
    }));
  };

  const endSession = () => {
    const sessionSummary = {
      ...sessionData,
      duration: sessionData.startTime ? Date.now() - sessionData.startTime : 0,
      accuracy: sessionData.cardsStudied > 0 
        ? Math.round((sessionData.correctAnswers / sessionData.cardsStudied) * 100) 
        : 0
    };

    setSessionData({
      startTime: null,
      cardsStudied: 0,
      correctAnswers: 0,
      totalTime: 0
    });

    return sessionSummary;
  };

  return {
    sessionData,
    startSession,
    recordAnswer,
    endSession,
    isActive: sessionData.startTime !== null
  };
};
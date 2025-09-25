import React from 'react';
import { BookOpen, BarChart3, Plus, Edit } from 'lucide-react';
import StatsCard from './ui/StatsCard';
import ActionButton from './ui/ActionButton';
// import Progress from './ui/ProgressBar';

const HomePage = ({ stats, onNavigate, onShowAddForm }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-4">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-800">Flash Card App</h1>
          </div>
          <p className="text-gray-600">Học từ vựng hiệu quả với flash card</p>
        </div>

        {/* Progress Card */}
        <StatsCard stats={stats} />

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionButton
            icon={BookOpen}
            title="Học ngay"
            description="Bắt đầu học với flash card"
            gradient="from-emerald-500 to-teal-500"
            textColor="text-emerald-100"
            onClick={() => onNavigate('study')}
          />

          <ActionButton
            icon={Plus}
            title="Thêm thẻ"
            description="Tạo flash card mới"
            gradient="from-teal-500 to-cyan-500"
            textColor="text-teal-100"
            onClick={onShowAddForm}
          />

          <ActionButton
            icon={Edit}
            title="Quản lý"
            description="Chỉnh sửa flash card"
            gradient="from-cyan-500 to-blue-500"
            textColor="text-cyan-100"
            onClick={() => onNavigate('manage')}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

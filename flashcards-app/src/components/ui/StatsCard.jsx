import React from "react";
import { BookOpen } from "lucide-react";
import ProgressBar from "./ProgressBar";

const StatsCard = ({ stats }) => {
  const { completed, total } = stats;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-xl border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Tiến trình học tập</h2>
        </div>
        <div className="text-xl font-bold text-emerald-600">
          {completed}/{total}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Thẻ đã học</p>
        <ProgressBar progress={progress} />
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Thẻ còn lại</p>
          <p className="text-lg font-bold text-gray-700">{total - completed}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Hoàn thành</p>
          <p className="text-lg font-bold text-gray-700">{progress.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

// // components/ActionButton.js
// const ActionButton = ({ icon: Icon, title, description, gradient, textColor, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`bg-gradient-to-r ${gradient} text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200`}
//     >
//       <Icon className="w-8 h-8 mx-auto mb-2" />
//       <div className="font-semibold text-lg">{title}</div>
//       <div className={`${textColor} text-sm`}>{description}</div>
//     </button>
//   );
// };

// // components/ProgressBar.js
// const ProgressBar = ({ progress }) => {
//   return (
//     <div className="w-full bg-gray-200 rounded-full h-3">
//       <div 
//         className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
//         style={{ width: `${progress}%` }}
//       ></div>
//     </div>
//   );
// };

// // components/BackButton.js
// const BackButton = ({ onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
//     >
//       ←
//     </button>
//   );
// };

// export { StatsCard, ActionButton, ProgressBar, BackButton };
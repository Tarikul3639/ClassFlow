
import React, { useState } from 'react';
// import { generateAcademicPlan } from '../services/geminiService';
import { AcademicPlan } from '@/types/types';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlannerModal: React.FC<PlannerModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AcademicPlan | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
    //   const data = await generateAcademicPlan(query);
    //   setPlan(data);
    } catch (err) {
      setError('Could not generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            AI Smart Planner
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-main">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {!plan ? (
            <div className="space-y-4">
              <p className="text-text-muted">Tell ClassFlow what you need to study, and our AI will build a custom plan for you.</p>
              <textarea 
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px]"
                placeholder="e.g., I have a Physics exam in 3 days. I need to cover Mechanics, Electromagnetism, and Optics. I can study for 4 hours each day."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={handleGenerate}
                disabled={loading || !query.trim()}
                className="w-full h-12 bg-primary text-white font-bold rounded-xl disabled:opacity-50 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <span className="animate-spin material-symbols-outlined">sync</span> : 'Generate My Plan'}
              </button>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <p className="text-text-main leading-relaxed font-medium">{plan.summary}</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Study Schedule</h3>
                <div className="space-y-2">
                  {plan.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-primary uppercase w-16">{task.time}</span>
                        <span className="text-sm font-medium">{task.task}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        task.priority === 'High' ? 'bg-red-100 text-red-600' : 
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Study Tips</h3>
                <ul className="space-y-2">
                  {plan.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setPlan(null)}
                className="w-full h-11 border border-gray-200 text-text-muted font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Start New Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerModal;

import React, { useState } from "react";
import { Scale, ShieldAlert, Award, Calendar, Flame, Trash2, HelpCircle } from "lucide-react";

export default function ImpactDashboard({ cookedHistory, onResetHistory }) {
  const [weeklyGoal, setWeeklyGoal] = useState(3); // target: 3 kg/week
  
  // Calculate aggregate stats
  const totalRecipes = cookedHistory.length;
  const totalWasteGrams = cookedHistory.reduce((sum, item) => sum + (item.wasteSaved || 0), 0);
  const totalWasteKg = Number((totalWasteGrams / 1000).toFixed(2));
  
  // CO2 multiplier: 1 kg food waste = 2.5 kg CO2 equivalent
  const totalCo2Saved = Number((totalWasteKg * 2.5).toFixed(2));
  
  // Equivalent metrics for visualization
  // e.g. Car miles avoided (1 kg CO2 = ~2.5 miles driving)
  const carMilesAvoided = Number((totalCo2Saved * 2.5).toFixed(1));
  // e.g. Phones charged (1 kg CO2 = ~120 charges)
  const phonesCharged = Math.round(totalCo2Saved * 121);

  // Goal Progress Percentage
  const progressPercent = Math.min(Math.round((totalWasteKg / weeklyGoal) * 100), 100);

  // Group history by weekday to light up the calendar grid
  const getWeekdayGrid = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grid = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    
    cookedHistory.forEach(item => {
      try {
        const date = new Date(item.timestamp);
        const dayName = days[date.getDay()];
        grid[dayName] = grid[dayName] + 1;
      } catch (e) {}
    });
    
    return grid;
  };

  const weekdayCounts = getWeekdayGrid();

  return (
    <div className="impact-container glassmorphic card">
      <div className="impact-header">
        <div className="title-area">
          <Award className="icon text-accent animate-pulse" />
          <h2>My Eco-Impact Tracker</h2>
        </div>
        <p className="subtitle">Real-time statistics showing how your kitchen leftovers reduce food waste and greenhouse gases.</p>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="stats-grid-cards">
        <div className="impact-stat-card glassmorphic">
          <div className="card-icon-circle waste">
            <Scale size={24} />
          </div>
          <div className="stat-text-block">
            <h3 className="stat-number font-mono">{totalWasteKg} <span className="stat-unit">kg</span></h3>
            <span className="stat-name">Food Waste Prevented</span>
          </div>
        </div>

        <div className="impact-stat-card glassmorphic">
          <div className="card-icon-circle carbon">
            <Flame size={24} />
          </div>
          <div className="stat-text-block">
            <h3 className="stat-number font-mono">{totalCo2Saved} <span className="stat-unit">kg</span></h3>
            <span className="stat-name">CO2 Emissions Saved</span>
          </div>
        </div>

        <div className="impact-stat-card glassmorphic">
          <div className="card-icon-circle recipes">
            <Calendar size={24} />
          </div>
          <div className="stat-text-block">
            <h3 className="stat-number font-mono">{totalRecipes}</h3>
            <span className="stat-name">Leftover Meals Cooked</span>
          </div>
        </div>
      </div>

      {/* Goal Ring & Equivalent Area */}
      <div className="impact-details-section">
        {/* Goal Progress Ring */}
        <div className="goal-progress-card glassmorphic">
          <h4>Weekly Leftover Goal</h4>
          <div className="progress-gauge-wrapper">
            <svg className="progress-ring-svg" width="120" height="120">
              <circle className="ring-bg" cx="60" cy="60" r="50" />
              <circle 
                className="ring-bar accent" 
                cx="60" 
                cy="60" 
                r="50" 
                style={{ 
                  strokeDasharray: `${2 * Math.PI * 50}`,
                  strokeDashoffset: `${2 * Math.PI * 50 * (1 - progressPercent / 100)}`
                }} 
              />
            </svg>
            <div className="progress-gauge-text">
              <span className="gauge-percent font-mono">{progressPercent}%</span>
              <span className="gauge-label">of {weeklyGoal}kg</span>
            </div>
          </div>

          <div className="goal-setter-slider">
            <div className="slider-header">
              <span>Adjust Goal:</span>
              <span className="goal-val font-semibold">{weeklyGoal} kg/week</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.5" 
              value={weeklyGoal} 
              onChange={(e) => setWeeklyGoal(parseFloat(e.target.value))} 
              className="goal-slider"
            />
          </div>
        </div>

        {/* Equivalents & Fun Stats */}
        <div className="fun-stats-card glassmorphic">
          <h4>Your Savings Equivalents</h4>
          <p className="fun-description">By saving food from landfills, you have offset greenhouse gases equivalent to:</p>
          
          <div className="equivalents-list">
            <div className="equivalent-item">
              <span className="eq-icon">🚗</span>
              <div className="eq-info">
                <span className="eq-val font-mono">{carMilesAvoided} miles</span>
                <span className="eq-lbl">of driving avoided</span>
              </div>
            </div>

            <div className="equivalent-item">
              <span className="eq-icon">🔌</span>
              <div className="eq-info">
                <span className="eq-val font-mono">{phonesCharged}</span>
                <span className="eq-lbl">smartphones charged</span>
              </div>
            </div>

            <div className="equivalent-item">
              <span className="eq-icon">🌳</span>
              <div className="eq-info">
                <span className="eq-val font-mono">{Number((totalCo2Saved / 22).toFixed(3))}</span>
                <span className="eq-lbl">trees' worth of annual absorption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Calendar Heatmap */}
      <div className="week-grid-card glassmorphic">
        <h4>Weekly Activity Grid</h4>
        <p className="subtitle-grid">Days you cooked leftover recipes in this workspace.</p>
        <div className="weekday-grid">
          {Object.entries(weekdayCounts).map(([day, count]) => (
            <div key={day} className={`weekday-box ${count > 0 ? "active" : ""}`}>
              <span className="day-name">{day}</span>
              <span className="day-count">{count > 0 ? "🍳" : "•"}</span>
              {count > 0 && <span className="day-badge font-mono">{count}x</span>}
            </div>
          ))}
        </div>
      </div>

      {/* History Log */}
      <div className="cooked-history-log">
        <div className="history-header">
          <h3>History Log</h3>
          {cookedHistory.length > 0 && (
            <button className="btn-history-clear" onClick={onResetHistory}>
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {cookedHistory.length === 0 ? (
          <div className="empty-history">
            <ShieldAlert size={24} className="text-muted" />
            <p>No cooked meals logged yet. Complete a step-by-step cooking recipe to build history.</p>
          </div>
        ) : (
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Recipe</th>
                  <th>Servings</th>
                  <th>Waste Diverted</th>
                </tr>
              </thead>
              <tbody>
                {cookedHistory.map((item, index) => (
                  <tr key={index} className="history-row">
                    <td className="font-mono text-muted">
                      {new Date(item.timestamp).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="font-semibold">{item.title}</td>
                    <td className="font-mono">{item.servings}</td>
                    <td className="font-mono text-accent font-semibold">+{item.wasteSaved}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

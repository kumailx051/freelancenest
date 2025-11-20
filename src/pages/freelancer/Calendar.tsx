import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  Download,
  AlertCircle
} from 'lucide-react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day

  const events = [
    {
      id: 1,
      title: 'Client Meeting - TechCorp Solutions',
      type: 'meeting',
      date: '2025-08-30',
      startTime: '10:00',
      endTime: '11:00',
      description: 'Weekly project review and milestone planning',
      client: 'Sarah Johnson',
      project: 'E-commerce Platform',
      location: 'Zoom Meeting',
      attendees: ['Sarah Johnson', 'Mike Chen'],
      status: 'confirmed',
      reminder: '15 minutes before',
      meetingLink: 'https://zoom.us/j/123456789'
    },
    {
      id: 2,
      title: 'Development Block - Payment Integration',
      type: 'work',
      date: '2025-08-30',
      startTime: '14:00',
      endTime: '17:00',
      description: 'Focus time for implementing Stripe payment gateway',
      project: 'E-commerce Platform',
      status: 'scheduled',
      reminder: '5 minutes before'
    },
    {
      id: 3,
      title: 'Proposal Deadline - Analytics Dashboard',
      type: 'deadline',
      date: '2025-08-31',
      startTime: '23:59',
      endTime: '23:59',
      description: 'Submit proposal for DataViz Solutions project',
      client: 'DataViz Solutions',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Team Standup - InnovateTech',
      type: 'meeting',
      date: '2025-09-01',
      startTime: '09:00',
      endTime: '09:30',
      description: 'Daily standup with development team',
      client: 'InnovateTech Inc',
      project: 'SaaS Dashboard',
      location: 'Google Meet',
      attendees: ['Michael Chen', 'Lisa Wang', 'David Kim'],
      status: 'confirmed',
      recurring: 'daily'
    },
    {
      id: 5,
      title: 'Code Review Session',
      type: 'work',
      date: '2025-09-01',
      startTime: '15:00',
      endTime: '16:30',
      description: 'Review pull requests and provide feedback',
      project: 'Multiple Projects',
      status: 'scheduled'
    },
    {
      id: 6,
      title: 'Milestone Delivery - React Components',
      type: 'deadline',
      date: '2025-09-02',
      startTime: '18:00',
      endTime: '18:00',
      description: 'Deliver completed React components for review',
      client: 'MobileFirst Co',
      project: 'React Native App',
      status: 'pending',
      priority: 'high'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'work':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'deadline':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-4 h-4" />;
      case 'work':
        return <Clock className="w-4 h-4" />;
      case 'deadline':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const todayEvents = getEventsForDate(new Date().toISOString().split('T')[0]);
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Calendar</h1>
            <p className="text-[#2E2E2E]/70">Manage your schedule and deadlines</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Mini Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#2E2E2E]">{formatMonthYear(currentDate)}</h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="p-2 font-medium text-[#2E2E2E]/60">
                    {day}
                  </div>
                ))}
                {getDaysInMonth().map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded cursor-pointer ${
                      day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()
                        ? 'bg-[#FF6B00] text-white'
                        : day
                        ? 'hover:bg-gray-100 text-[#2E2E2E]'
                        : 'text-transparent'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <h3 className="font-semibold text-[#2E2E2E] mb-3">Today's Events</h3>
              <div className="space-y-2">
                {todayEvents.length > 0 ? (
                  todayEvents.map((event) => (
                    <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {getEventTypeIcon(event.type)}
                        <span className="font-medium text-sm">{event.startTime}</span>
                      </div>
                      <p className="text-sm font-medium">{event.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#2E2E2E]/60 text-sm">No events today</p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-[#2E2E2E] mb-3">Upcoming</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className={`p-1 rounded ${getEventTypeColor(event.type)}`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2E2E2E] truncate">{event.title}</p>
                      <p className="text-xs text-[#2E2E2E]/60">
                        {new Date(event.date).toLocaleDateString()} at {event.startTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Calendar Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-[#2E2E2E]">{formatMonthYear(currentDate)}</h2>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Today
                    </button>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setView('month')}
                        className={`px-4 py-2 font-medium transition-colors ${
                          view === 'month'
                            ? 'bg-[#FF6B00] text-white'
                            : 'text-[#2E2E2E] hover:bg-gray-50'
                        }`}
                      >
                        Month
                      </button>
                      <button
                        onClick={() => setView('week')}
                        className={`px-4 py-2 font-medium transition-colors ${
                          view === 'week'
                            ? 'bg-[#FF6B00] text-white'
                            : 'text-[#2E2E2E] hover:bg-gray-50'
                        }`}
                      >
                        Week
                      </button>
                      <button
                        onClick={() => setView('day')}
                        className={`px-4 py-2 font-medium transition-colors ${
                          view === 'day'
                            ? 'bg-[#FF6B00] text-white'
                            : 'text-[#2E2E2E] hover:bg-gray-50'
                        }`}
                      >
                        Day
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {view === 'month' && (
                  <div>
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                        <div key={day} className="p-3 text-center font-medium text-[#2E2E2E]/70 text-sm">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth().map((day, index) => {
                        const dateStr = day ? `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : '';
                        const dayEvents = day ? getEventsForDate(dateStr) : [];
                        const isToday = day === new Date().getDate() && 
                                       currentDate.getMonth() === new Date().getMonth() &&
                                       currentDate.getFullYear() === new Date().getFullYear();
                        
                        return (
                          <div
                            key={index}
                            className={`min-h-[120px] p-2 border border-gray-100 ${
                              day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                            } cursor-pointer`}
                          >
                            {day && (
                              <>
                                <div className={`text-sm font-medium mb-1 ${
                                  isToday ? 'text-[#FF6B00]' : 'text-[#2E2E2E]'
                                }`}>
                                  {day}
                                </div>
                                <div className="space-y-1">
                                  {dayEvents.slice(0, 3).map((event) => (
                                    <div
                                      key={event.id}
                                      className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                                    >
                                      {event.startTime} {event.title}
                                    </div>
                                  ))}
                                  {dayEvents.length > 3 && (
                                    <div className="text-xs text-[#2E2E2E]/60 p-1">
                                      +{dayEvents.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Week View */}
                {view === 'week' && (
                  <div className="text-center py-20">
                    <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-[#2E2E2E]/60">Week view coming soon</p>
                  </div>
                )}

                {/* Day View */}
                {view === 'day' && (
                  <div className="text-center py-20">
                    <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-[#2E2E2E]/60">Day view coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

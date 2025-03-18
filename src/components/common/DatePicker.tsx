import React, { useState, useEffect, useRef, JSX } from 'react';
import styled from 'styled-components';

const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const CalendarButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  color: #6b7280;
  &:hover {
    color: #374151;
  }
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.25rem;
  background-color: white;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const MonthYearLabel = styled.div`
  font-weight: 500;
`;

const ArrowButton = styled.button`
  padding: 0.25rem;
  border-radius: 9999px;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const CalendarBody = styled.div`
  padding: 0.5rem;
`;

const WeekdaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`;

const WeekdayCell = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const DayCell = styled.div`
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #e0f2fe;
  }
`;

const EmptyCell = styled.div`
  padding: 0.5rem;
  text-align: center;
  color: #d1d5db;
`;

const SelectedDayCell = styled(DayCell)`
  background-color: #3b82f6;
  color: white;
  border-radius: 9999px;
`;

const CalendarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-top: 1px solid #e5e7eb;
`;

const FooterButton = styled.button`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
`;

const TodayButton = styled(FooterButton)`
  color: #3b82f6;
  &:hover {
    background-color: #eff6ff;
  }
`;

const CancelButton = styled(FooterButton)`
  color: #6b7280;
  &:hover {
    background-color: #f3f4f6;
  }
`;

interface DatePickerProps {
  onChange?: (date: Date) => void;
  initialDate?: Date;
  label?: string;
  id?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  onChange, 
  initialDate = new Date(), 
  label = "Date", 
  id = "datepicker" 
}) => {
  const [date, setDate] = useState<Date>(initialDate);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<number>(initialDate.getMonth());
  const [year, setYear] = useState<number>(initialDate.getFullYear());
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // Format date for display
  const formatDisplayDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get days in month
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Handle date selection
  const handleDateSelect = (day: number): void => {
    const newDate = new Date(year, month, day);
    setDate(newDate);
    onChange && onChange(newDate);
    setIsOpen(false);
  };

  // Previous month
  const prevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // Next month
  const nextMonth = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Render calendar days
  const renderDays = (): JSX.Element[] => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days: JSX.Element[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<EmptyCell key={`empty-${i}`}></EmptyCell>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDate = new Date(year, month, day).toDateString() === date.toDateString();
      
      if (isCurrentDate) {
        days.push(
          <SelectedDayCell 
            key={day} 
            onClick={() => handleDateSelect(day)}
          >
            {day}
          </SelectedDayCell>
        );
      } else {
        days.push(
          <DayCell 
            key={day} 
            onClick={() => handleDateSelect(day)}
          >
            {day}
          </DayCell>
        );
      }
    }
    
    return days;
  };

  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <DatePickerContainer ref={datePickerRef}>
      <Label htmlFor={id}>
        {label}
      </Label>
      <InputContainer>
        <Input
          type="text"
          id={id}
          value={formatDisplayDate(date)}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
        />
        <CalendarButton 
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </CalendarButton>
      </InputContainer>
      
      {isOpen && (
        <CalendarContainer>
          <CalendarHeader>
            <ArrowButton onClick={prevMonth} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </ArrowButton>
            <MonthYearLabel>
              {monthNames[month]} {year}
            </MonthYearLabel>
            <ArrowButton onClick={nextMonth} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </ArrowButton>
          </CalendarHeader>
          <CalendarBody>
            <WeekdaysGrid>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                <WeekdayCell key={day}>
                  {day}
                </WeekdayCell>
              ))}
            </WeekdaysGrid>
            <DaysGrid>
              {renderDays()}
            </DaysGrid>
          </CalendarBody>
          <CalendarFooter>
            <TodayButton 
              onClick={() => {
                const today = new Date();
                setMonth(today.getMonth());
                setYear(today.getFullYear());
                handleDateSelect(today.getDate());
              }}
              type="button"
            >
              Today
            </TodayButton>
            <CancelButton 
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </CancelButton>
          </CalendarFooter>
        </CalendarContainer>
      )}
    </DatePickerContainer>
  );
};

export default DatePicker;
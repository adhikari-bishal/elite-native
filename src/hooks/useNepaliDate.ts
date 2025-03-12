import { useMemo } from "react";
import { MONTHS, YEARS } from "../constants/dates";

const useNepaliDate = () => {
  const getYears = useMemo(() => {
    return YEARS.map((item) => ({
      label: item.year.toString(),
      value: item.year,
    }));
  }, []);

  const getMonths = useMemo(() => {
    return MONTHS.map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }, []);

  const getDays = useMemo(() => {
    return (year = 2080, month = 3) => {
      const selectedYear = YEARS.find((y) => y.year === year);
      if (!selectedYear) {
        throw new Error(`Year ${year} not found`);
      }

      const daysInMonth = selectedYear.months[month - 1];
      if (!daysInMonth) {
        throw new Error(`Month ${month} is invalid`);
      }

      return Array.from({ length: daysInMonth }, (_, index) => ({
        label: (index + 1).toString(),
        value: index + 1,
      }));
    };
  }, []);

  return { getYears, getMonths, getDays };
};

export default useNepaliDate;

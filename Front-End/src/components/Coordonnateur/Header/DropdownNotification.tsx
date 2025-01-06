"use client";
import { useEffect, useState, useRef } from "react";

const Table = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formattedDate);
  }, []);

  return (
    <div className="rounded-[50px] border border-stroke bg-gray-3 sm:p-1.5">
      {date}
    </div>
  );
};

export default Table;

export const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };
  
  export const getLastThreeMonths = () => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push(`${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`);
    }
    return result;
  };
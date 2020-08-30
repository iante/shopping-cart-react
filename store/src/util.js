export default function formatCurrency(num) {
   //covertz to one decimal place
    return "ksh" + Number(num.toFixed(1)).toLocaleString() + " ";
  }
  
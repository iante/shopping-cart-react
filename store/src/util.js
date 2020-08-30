export default function formatCurrency(num) {
   //coverts to one decimal place
    return "ksh" + Number(num.toFixed(1)).toLocaleString() + " ";
  }
  
export const calculateGermanAmortization = (
  principal: number,
  interestRate: number,
  periods: number
) => {
  const table = [];
  let remainingPrincipal = principal;

  for (let i = 1; i <= periods; i++) {
    const interest = remainingPrincipal * interestRate;
    const capitalPayment = principal / periods;
    const totalPayment = interest + capitalPayment;
    remainingPrincipal -= capitalPayment;

    table.push({
      period: i,
      totalPayment: totalPayment.toFixed(2),
      interest: interest.toFixed(2),
      capitalPayment: capitalPayment.toFixed(2),
      remainingPrincipal: remainingPrincipal.toFixed(2),
    });
  }

  return table;
};
export const calculateFrenchAmortization = (
  principal: number,
  interestRate: number,
  periods: number
) => {
  const table = [];
  const annuity =
    (principal * interestRate) / (1 - Math.pow(1 + interestRate, -periods));
  let remainingPrincipal = principal;

  for (let i = 1; i <= periods; i++) {
    const interest = remainingPrincipal * interestRate;
    const capitalPayment = annuity - interest;
    remainingPrincipal -= capitalPayment;

    table.push({
      period: i,
      totalPayment: annuity.toFixed(2),
      interest: interest.toFixed(2),
      capitalPayment: capitalPayment.toFixed(2),
      remainingPrincipal: remainingPrincipal.toFixed(2),
    });
  }

  return table;
};

export const calculateAmericanAmortization = (
  principal: number,
  interestRate: number,
  periods: number
) => {
  const table = [];
  const interestPayment = principal * interestRate;
  let remainingPrincipal = principal;

  for (let i = 1; i <= periods; i++) {
    const capitalPayment = i === periods ? principal : 0;
    remainingPrincipal -= capitalPayment;

    table.push({
      period: i,
      totalPayment: (interestPayment + capitalPayment).toFixed(2),
      interest: interestPayment.toFixed(2),
      capitalPayment: capitalPayment.toFixed(2),
      remainingPrincipal: remainingPrincipal.toFixed(2),
    });
  }

  return table;
};

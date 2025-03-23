// 檢查一個數是否為質數
export const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

// 獲取一個數的所有質因數
export const getPrimeFactors = (n: number): number[] => {
  const factors: number[] = [];
  let divisor = 2;
  let number = n;

  while (number > 1) {
    while (number % divisor === 0) {
      factors.push(divisor);
      number /= divisor;
    }
    divisor++;
    if (divisor * divisor > number) {
      if (number > 1) {
        factors.push(number);
      }
      break;
    }
  }

  return factors;
};

// 生成一個隨機的合數（2-1000之間）
export const generateRandomCompositeNumber = (): number => {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  let result = 1;
  
  // 隨機選擇1-3個質數相乘
  const numFactors = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < numFactors; i++) {
    const randomPrime = primes[Math.floor(Math.random() * primes.length)];
    result *= randomPrime;
  }

  // 確保結果在2-1000之間
  while (result > 1000) {
    result = Math.floor(result / 2);
  }
  while (result < 2) {
    result *= 2;
  }

  return result;
};

// 獲取2-100之間的所有質數
export const getPrimesUpTo100 = (): number[] => {
  const primes: number[] = [];
  for (let i = 2; i <= 100; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}; 
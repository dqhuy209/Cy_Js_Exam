// Câu 2, Viết chương trình JS nhận vào một mảng sau (1đ)
//      var mang = new Array(10,5,2,5,6,7,8,9);
// ●	Sau 3 giây tính tổng các chữ số trong mảng và in ra màn hình
// ●	Tiếp sau 3 giây tìm các số là số nguyên tố và in ra màn hình
// ●	Tiếp sau 3 giây tìm các số chia hết cho 3 và in ra màn hình

var mang = new Array(10, 5, 2, 5, 6, 7, 8, 9);
function calculateSum(array) {
  return array.reduce((sum, num) => sum + num, 0);
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function findPrimes(array) {
  return array.filter(isPrime);
}

function findDivisibleByThree(array) {
  return array.filter((num) => num % 3 === 0);
}

function delay(time, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, time);
  });
}

delay(3000, () => {
  const sum = calculateSum(mang);
  console.log("Tổng các phần tử trong mảng:", sum);
})
  .then(() =>
    delay(3000, () => {
      const primes = findPrimes(mang);
      console.log("Các số nguyên tố trong mảng:", primes);
    })
  )
  .then(() =>
    delay(3000, () => {
      const divisibleByThree = findDivisibleByThree(mang);
      console.log("Các số chia hết cho 3 trong mảng:", divisibleByThree);
    })
  );

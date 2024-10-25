// Câu 1, Viết chương trình JS cứ sau hai giây lại trả về một số ngẫu nhiên từ 1-100. Sau đó tìm xem số này có phải số hoàn hảo hay không. (1đ)

function randomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function perfectNumber(num) {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
}
setInterval(() => {
  const number = randomNumber();
  console.log("Số ngẫu nhiên:", number);

  if (perfectNumber(number)) {
    console.log(number + " là số hoàn hảo!");
  } else {
    console.log(number + " không phải là số hoàn hảo.");
  }
}, 2000);

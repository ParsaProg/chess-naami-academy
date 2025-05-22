import CountUp from 'react-countup';

interface PersianCountUpProps {
  num: number;
  duration?: number;
}

const toPersianDigits = (num: number | string) => {
  return String(num).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const PersianCountUp = ({ num, duration = 2 }: PersianCountUpProps) => (
  <CountUp
    end={num}
    duration={duration}
    formattingFn={(value) => toPersianDigits(Math.floor(value))}
  />
);

export default PersianCountUp;

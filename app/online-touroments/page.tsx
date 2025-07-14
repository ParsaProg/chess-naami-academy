import { TfiCup } from "react-icons/tfi";
import { IoMdStopwatch } from "react-icons/io";
import Container from "@/components/main/online-tournoments-page/containers";
import OnlineTournoments from "@/interfaces/online-tournoments";

export default function OnlineTouroments() {
  const sampleTournaments: OnlineTournoments[] = [
    {
      title: "مسابقه برق‌آسا هفتگی",
      description: "مسابقه برق‌آسا 3+2 - جایزه نقدی برای سه نفر اول",
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
      lichessUrl: "https://lichess.org/tournament/example1",
      participants: 45,
      status: "upcoming",
      ratingCategory: "متوسط",
      minRating: 1200,
      maxRating: 1600,
    },
    {
      title: "تورنمنت کلاسیک ماهانه",
      description: "مسابقه کلاسیک 15+10 - ویژه اعضای باشگاه",
      startTime: new Date(Date.now() - 30 * 60 * 1000),
      endTime: new Date(Date.now() + 90 * 60 * 1000),
      lichessUrl: "https://lichess.org/tournament/example2",
      participants: 28,
      status: "live",
      ratingCategory: "آزاد",
    },
    {
      title: "مسابقه سریع جمعه",
      description: "مسابقه سریع 5+3 - آزاد برای همه",
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 26 * 60 * 60 * 1000),
      lichessUrl: "https://lichess.org/tournament/example3",
      participants: 67,
      status: "upcoming",
      ratingCategory: "مبتدی",
      maxRating: 1200,
    },
    {
      title: "چالش استادان",
      description: "مسابقه ویژه بازیکنان حرفه‌ای - رتبه بالای 2000",
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      endTime: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
      ),
      lichessUrl: "https://lichess.org/tournament/example4",
      participants: 24,
      status: "finished",
      ratingCategory: "استاد",
      minRating: 2000,
    },
    {
      title: "تورنمنت مبتدیان",
      description: "ویژه بازیکنان تازه‌کار - رتبه زیر 1200",
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
      lichessUrl: "https://lichess.org/tournament/example5",
      participants: 89,
      status: "finished",
      ratingCategory: "مبتدی",
      maxRating: 1200,
    },
    {
      title: "مسابقه پیشرفتگان",
      description: "برای بازیکنان با تجربه - ریتینگ 1600 تا 2000",
      startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      endTime: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
      ),
      lichessUrl: "https://lichess.org/tournament/example6",
      participants: 32,
      status: "upcoming",
      ratingCategory: "حرفه‌ای",
      minRating: 1600,
      maxRating: 2000,
    },
  ];

  return (
    <div className="online-tournoments w-[90%] mx-auto mt-[50px]">
      <div className="text-black flex items-center gap-x-3 justify-center text-3xl">
        <TfiCup size={25} />
        <h1>مسابقات آنلاین شطرنج</h1>
        <TfiCup size={25} />
      </div>
      <h3 className="text-md text-slate-500 font-[500] text-center mt-3">
        به مسابقات هیجان‌انگیز باشگاه شطرنج بپیوندید
      </h3>
      <div className="flex items-center gap-x-1 font-bold text-2xl text-black mt-5">
        مسابقات فعال و آینده
        <IoMdStopwatch size={30} color="#16A34A" />
      </div>
      <div className="grid items-center lg:grid-cols-3 gap-5 mt-8">
        {sampleTournaments.some(
          (value) => value.status === "live" || value.status === "upcoming"
        ) ? (
          sampleTournaments
            .filter((val) => val.status === "live" || val.status === "upcoming")
            .map((t, _i) => (
              <Container
                description={t.description}
                endTime={t.endTime}
                lichessUrl={t.lichessUrl}
                title={t.title}
                participants={t.participants}
                ratingCategory={t.ratingCategory}
                startTime={t.startTime}
                status={t.status}
                key={_i}
                maxRating={t.maxRating}
                minRating={t.minRating}
              />
            ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex items-center gap-x-1 font-bold text-2xl text-black mt-5">
        مسابقات تمام شده
        <IoMdStopwatch size={30} />
      </div>
      <div className="grid items-center lg:grid-cols-3 gap-5 mt-8">
        {sampleTournaments.some(
          (value) => value.status === "live" || value.status === "upcoming"
        ) ? (
          sampleTournaments
            .filter((val) => val.status === "finished")
            .map((t, _i) => (
              <Container
                description={t.description}
                endTime={t.endTime}
                lichessUrl={t.lichessUrl}
                title={t.title}
                participants={t.participants}
                ratingCategory={t.ratingCategory}
                startTime={t.startTime}
                status={t.status}
                key={_i}
                maxRating={t.maxRating}
                minRating={t.minRating}
              />
            ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

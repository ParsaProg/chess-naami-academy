"use client";

import { TfiCup } from "react-icons/tfi";
import { IoMdStopwatch } from "react-icons/io";
import Container from "@/components/main/online-tournoments-page/containers";
import OnlineTournoments from "@/interfaces/online-tournoments";
import { useEffect, useState } from "react";

export default function OnlineTouroments() {
  const [tournomentsData, setTournomentsData] = useState<OnlineTournoments[]>(
    []
  );
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/admin/api/online-tournoments", {
        method: "GET",
        headers: {
          Authorization: "Berear mysecrettoken123",
        },
      });
      if (!res.ok) throw new Error("Can not fetch data from the server");
      const tData = await res.json();
      setTournomentsData(tData);
    };

    try {
      getData();
    } catch (error: unknown) {
      console.log(error);
    }
  }, []);
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
      {tournomentsData.length !== 0 ? (
        <section>
          <div className="flex items-center gap-x-1 font-bold text-2xl text-black mt-5">
            مسابقات فعال و آینده
            <IoMdStopwatch size={30} color="#16A34A" />
          </div>
          <div className="grid items-center lg:grid-cols-3 gap-5 mt-8">
            {tournomentsData.some(
              (value) => value.status === "live" || value.status === "upcoming"
            ) ? (
              tournomentsData
                .filter(
                  (val) => val.status === "live" || val.status === "upcoming"
                )
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
            {tournomentsData.some(
              (value) => value.status === "live" || value.status === "upcoming"
            ) ? (
              tournomentsData
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
        </section>
      ) : (
        <h1 className="text-center font-bold text-3xl">هیچ مسابقه‌ای اضافه نشده</h1>
      )}
    </div>
  );
}

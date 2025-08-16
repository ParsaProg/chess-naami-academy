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
  const [tournomentsDataCashed, setTournomentsDataCashed] = useState<
    OnlineTournoments[]
  >([]);
  const [filterMode, setFilterMode] = useState<string>("");
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/admin/api/online-tournoments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_API_SECRET_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error("Can not fetch data from the server");
      const tData = await res.json();
      setTournomentsData(tData);
      setTournomentsDataCashed(tData);
    };

    try {
      getData();
    } catch (error: unknown) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if(filterMode === ""){
      setTournomentsData(tournomentsDataCashed)
    }else if(filterMode === "U"){
      const filtredUpTournoment = tournomentsDataCashed.filter((v => v.minRating! >= 1100));
      setTournomentsData(filtredUpTournoment)
    }
    else if(filterMode === "D"){
      const filtredDownTournoment = tournomentsDataCashed.filter((v => v.minRating! < 1100));
      setTournomentsData(filtredDownTournoment)
    }
  }, [filterMode, tournomentsDataCashed]);
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
      <section className="flex items-center gap-3 my-5 sm:flex-row flex-col ">
        <div
          onClick={() => {
            switch (filterMode) {
              case "":
                setFilterMode("D");
                break;
              case "D":
                setFilterMode("");
                break;
              case "U":
                setFilterMode("D");
              default:
                break;
            }
          }}
          className={`sm:w-auto w-[100%] transition-all duration-200 p-3 rounded-lg text-center flex items-center justify-center font-bold text-xl border-[1px] border-slate-200 ${
            filterMode === "D"
              ? "bg-orange-400 text-white"
              : "bg-slate-100 text-black"
          } cursor-pointer`}
        >
          مسابقات آیندگان (زیر ۱۱۰۰)
        </div>

        <div
          onClick={() => {
            switch (filterMode) {
              case "":
                setFilterMode("U");
                break;
              case "U":
                setFilterMode("");
                break;
              case "D":
                setFilterMode("U");
              default:
                break;
            }
          }}
          className={`sm:w-auto w-[100%] transition-all duration-200 p-3 rounded-lg text-center flex items-center justify-center font-bold text-xl border-[1px] border-slate-200 ${
            filterMode === "U"
              ? "bg-orange-400 text-white"
              : "bg-slate-100 text-black"
          } cursor-pointer`}
        >
          مسابقات ستارگان (بالای ۱۱۰۰)
        </div>
      </section>
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
          <div className="grid items-center lg:grid-cols-3 gap-5 mt-3">
            {tournomentsData.some(
              (value) => value.status === "live" || value.status === "upcoming"
            ) ? (
              tournomentsData.filter((val) => val.status === "finished")
                .length !== 0 ? (
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
                <h1 className="text-black font-bold text-xl">
                  هیچ مسابقه‌ی به اتمام رسیده‌ای وجود ندارد
                </h1>
              )
            ) : (
              <div className="text-black font-bold">
                هیچ مسابقه‌ی به اتمام رسیده‌ای وجود ندارد
              </div>
            )}
          </div>
        </section>
      ) : (
        <h1 className="text-center font-bold text-3xl mt-5">
          هیچ مسابقه‌ای اضافه نشده
        </h1>
      )}
    </div>
  );
}

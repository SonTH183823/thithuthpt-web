import React, {Fragment} from 'react';
import TitleExamItem from "@/components/exam/TitleExamItem";
import {formatPrice} from "../../utils/common";
import CharacteristicsItem from "@/components/characteristics/CharacteristicsItem";
import Dot from "@/components/common/Dot";
import {formatDate} from "../../utils/moment";
import time from "../../assets/images/svg/time.svg";
import list_view from "../../assets/images/svg/list-view.svg";
import list_check from "../../assets/images/svg/list-check.svg";

function ExamInfo({items}) {
    const item = {
        tradingForm: 1,
        showTitle: true,
        price: 10232434,
        deposit: 12242354,
        createdAt: 1213445,
        title: 'Đề thi THPT Quốc gia năm 2021 môn Lịch sử Mã đề 301',
        category: 4
    }
    const showTitle = true
    return (
        <div className={"p-4"}>
            <TitleExamItem className={"font-bold text-info flex items-center h-[50px]"}>
                <span>{item.title}</span>
            </TitleExamItem>
            <div className={'border-t-[1px] border-t-primary flex flex-row h-[50px] justify-between'}>
                <CharacteristicsItem icon={time}>
                    60 phút
                </CharacteristicsItem>
                <CharacteristicsItem icon={list_view}>
                    1234 lượt xem
                </CharacteristicsItem>
                <CharacteristicsItem icon={list_check}>
                    124 lượt thi
                </CharacteristicsItem>
            </div>
        </div>
    )
    return (
        <div>
            {item.tradingForm !== 3 ? (
                <div className={`${showTitle ? "p-4" : ""}`}>
                    {showTitle && (
                        <Fragment>
                            <div className="pb-2 flex items-center space-x-1 text-primary font-bold">
                <span className="text-2xl line-clamp-1">
                  {formatPrice(item.price)}
                    <span className="text-xl">&#8363;</span>
                  <span className="text-sm"> / tháng</span>
                </span>
                            </div>
                            <TitleExamItem className={"font-bold text-info flex items-center h-[50px]"}>
                                <span> {item.title}</span>
                            </TitleExamItem>
                            <CharacteristicsItem
                                icon={"fa-regular fa-location-dot"}
                                className={"py-2"}
                            >
                <span className="text-sm line-clamp-1">
                    Hà nội, việt nam
                    {/*{districtsConfig[item.district]},{" "}*/}
                    {/*  {provincesConfig[item.province]}*/}
                </span>
                            </CharacteristicsItem>
                        </Fragment>
                    )}
                    {item.category === 4 && (
                        <div
                            className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
                            <div className="flex items-center space-x-5">
                                <CharacteristicsItem
                                    icon={"fa-regular fa-up-right-and-down-left-from-center"}
                                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-loveseat"}>
                  <span className="line-clamp-1">
                    'furnitureConfig[item.isFurniture]'
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-toilet"}>
                  <span className="line-clamp-1">
                    privateToiletConfig[item.isPrivateToilet]
                  </span>
                                </CharacteristicsItem>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CharacteristicsItem icon={"fa-regular fa-people-group"}>
                  <span className="line-clamp-1">
                    stayWithHostConfig[item.isStayWithHost]
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                  <span className="line-clamp-1">
                    {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                      <span>&#8363;</span>
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <div
                                    className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center">
                                    {/*<span className="text-xs text-white line-clamp-1">*/}
                                    {/*  {getTradingForm(item.tradingForm)}*/}
                                    {/*</span>*/}
                                </div>
                            </div>
                        </div>
                    )}

                    {item.category === 3 && (
                        <div
                            className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
                            <div className="flex items-center space-x-5">
                                <CharacteristicsItem
                                    icon={"fa-regular fa-up-right-and-down-left-from-center"}
                                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-shop"}>
                  <span className="line-clamp-1">
                    typeOffice[item.typeOfApartment]
                  </span>
                                </CharacteristicsItem>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CharacteristicsItem icon={"fa-regular fa-arrow-up-9-1"}>
                  <span className="line-clamp-1">
                    {item.floor ? item.floor : <span>&#934;</span>}
                  </span>
                                </CharacteristicsItem>
                                {item.tradingForm === 1 && (
                                    <Fragment>
                                        <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                        <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                      <span className="line-clamp-1">
                        {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                          <span>&#8363;</span>
                      </span>
                                        </CharacteristicsItem>
                                    </Fragment>
                                )}
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <div
                                    className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center">
                  <span className="text-xs text-white line-clamp-1">
                    getTradingForm(item.tradingForm)
                  </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {item.category === 2 && (
                        <div
                            className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
                            <div className="flex items-center space-x-5">
                                <CharacteristicsItem
                                    icon={"fa-regular fa-up-right-and-down-left-from-center"}
                                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-loveseat"}>
                  <span className="line-clamp-1">
                    typeHouse[item.typeOfApartment]
                  </span>
                                </CharacteristicsItem>

                                {item.category === 1 && (
                                    <Fragment>
                                        <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                        <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                      <span className="line-clamp-1">
                        {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                          <span>&#8363;</span>
                      </span>
                                        </CharacteristicsItem>
                                    </Fragment>
                                )}
                            </div>
                            <div className="flex items-center space-x-3">
                                <CharacteristicsItem icon={"fa-regular fa-bed"}>
                  <span className="line-clamp-1">
                    item.numberOfBedrooms phòng
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-toilet"}>
                  <span className="line-clamp-1">
                    item.numberOfToilet phòng
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <div
                                    className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center ">
                  <span className="text-xs text-white line-clamp-1">
                    getTradingForm(item.tradingForm)
                  </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {item.category === 1 && (
                        <div
                            className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
                            <div className="flex items-center space-x-5">
                                <CharacteristicsItem
                                    icon={"fa-regular fa-up-right-and-down-left-from-center"}
                                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-loveseat"}>
                  <span className="line-clamp-1">
                    typeOfApartment[item.typeOfApartment]
                  </span>
                                </CharacteristicsItem>

                                {item.category === 1 && (
                                    <Fragment>
                                        <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                        <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                      <span className="line-clamp-1">
                        {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                          <span>&#8363;</span>
                      </span>
                                        </CharacteristicsItem>
                                    </Fragment>
                                )}
                            </div>
                            <div className="flex items-center space-x-3">
                                <CharacteristicsItem icon={"fa-regular fa-bed"}>
                  <span className="line-clamp-1">
                    item.numberOfBedrooms phòng
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <CharacteristicsItem icon={"fa-regular fa-toilet"}>
                  <span className="line-clamp-1">
                    item.numberOfToilet phòng
                  </span>
                                </CharacteristicsItem>
                                <Dot className="w-[4px] h-[4px] bg-gray-300"/>
                                <div
                                    className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center">
                  <span className="text-xs text-white line-clamp-1">
                    getTradingForm(item.tradingForm)
                  </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                        {/*<UserInfo user={item.user || user} id={item.userId || user.id}/>*/}
                        <span className="text-sm text-info">
              {formatDate(item.createdAt)}
            </span>
                    </div>
                </div>
            ) : (
                <div className="p-4">
                    <TitleExamItem
                        className={"font-bold text-info flex items-center h-[50px]"}
                    >
                        <span> {item.title}</span>
                    </TitleExamItem>

                    <CharacteristicsItem
                        icon={"fa-regular fa-location-dot"}
                        className={"py-2"}
                    >
            <span className="text-sm line-clamp-1">
              districtsConfig[item.district], provincesConfig[item.province]
            </span>
                    </CharacteristicsItem>
                    <div
                        className="line-clamp-4 min-h-[100px]"
                        dangerouslySetInnerHTML={{
                            __html: item.description,
                        }}
                    ></div>
                    <div className="pt-2 flex items-center justify-between">
                        {/*<UserInfo user={item.user || user} id={item.userId || user.id}/>*/}
                        <span className="text-sm text-info">
              {formatDate(item.createdAt)}
            </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExamInfo;
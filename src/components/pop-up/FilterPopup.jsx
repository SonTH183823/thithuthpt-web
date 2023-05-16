import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeaderPopupFilter from "./HeaderPopupFilter";
import Collapse from "../common/Collapse";
// import InputRange from "react-input-range";
import Select from "react-select";
import RadioWithoutValidate from "../input/RadioWithoutValidate";
import {
  categoryConfig,
  districtsConfig,
  // furnitueConfig,
  // hasVideoConfig,
  provincesConfig,
  tradingFormConfig,
  // wardsConfig,
} from "configs/configs";
import ButtonPrimary from "../button/ButtonPrimary";
import { addressAPI } from "apis/address";
import { useRouter } from "next/router";
import FeatureSection from "@/components/filter/FilterSection";
import ItemSelect from "@/components/filter/ItemSelect";
import InputRange from "react-input-range";
const FilterPopup = ({ show, setShow }) => {
  const router = useRouter();
  const [filterUrl, setFilterUrl] = useState("");
  const [provinceOption, setProvinceOption] = useState([]);
  const [districtOption, setDistrictOption] = useState([]);
  const [wardOption, setWardOption] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [tradingForm, setTradingForm] = useState(null);
  const [furniture, setFurniture] = useState(null);
  const [hasVideo, setHasVideo] = useState(null);
  const [category, setCategory] = useState(categoryConfig);
  const [checked, setChecked] = useState(false);
  const [maxNumQuestion, setMaxNumQuestion] = useState(1);
  const [timeToDo, setTimeToDo] = useState(0);

  useEffect(() => {
    (async () => {
      if (selectedProvince?.label) {
        // const res = await addressAPI.getDistricts(selectedProvince.value);
        if (res) {
          const temp = res.map((item) => ({
            value: item.id,
            label: item.fullName,
          }));
          setDistrictOption([...temp]);
        }
      }
    })();
  }, [selectedProvince]);

  useEffect(() => {
    (async () => {
      if (selectedDistrict?.label) {
        // const res = await addressAPI.getWards(selectedDistrict.value);
        if (res) {
          const temp = res.map((item) => ({
            value: item.id,
            label: item.fullName,
          }));
          setWardOption([...temp]);
        }
      }
    })();
  }, [selectedDistrict]);

  useEffect(() => {
    if (Object.keys(router.query).length) {
      const {
        category: cate,
        priceRange: priceRangeUrl,
        areaRange: areaRangeUrl,
        address,
        tradingForm: tradingFormUrl,
        isFurnitue: furnitureUrl,
        hasVideo: hasVideoUrl,
      } = router.query;

      if (cate) {
        let categoryArray = category.map((item) => {
          if (cate.split(",").includes(item.id.toString())) {
            return {
              ...item,
              isChecked: true,
            };
          }
          return item;
        });
        setCategory([...categoryArray]);
      }
      if (address) {
        const addressTemp = address.split(",");
        if (addressTemp[0]) {
          setSelectedProvince({
            value: addressTemp[0],
            label: provincesConfig[addressTemp[0]],
          });
        }
        if (addressTemp[1]) {
          setSelectedDistrict({
            value: addressTemp[1],
            label: districtsConfig[addressTemp[1]],
          });
        }
        // if (addressTemp[2]) {
        //   setSelectedWard({
        //     value: addressTemp[2],
        //     label: wardsConfig[addressTemp[2]],
        //   });
        // }
      }
      if (tradingFormUrl) {
        setTradingForm(tradingFormUrl);
      }
      if (furnitureUrl) {
        setFurniture(furnitureUrl);
      }
      if (hasVideoUrl) {
        setHasVideo(hasVideoUrl);
      }
    }
  }, [router.query]);

  const handleSelectTradingForm = (e) => {
    setTradingForm(e.target.value);
  };

  const handleSelectFurniture = (e) => {
    setFurniture(e.target.value);
  };

  const handleSelectHasVideo = (e) => {
    setHasVideo(e.target.value);
  };

  const handleSelectProvince = (option) => {
    setSelectedProvince(option);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleSelectDistrict = (option) => {
    setSelectedDistrict(option);
    setSelectedWard(null);
  };

  const handleSelectWard = (option) => {
    setSelectedWard(option);
  };

  const selectCategory = (id) => {
    const temp = category.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setCategory([...temp]);
  };

  const handleApply = () => {
    let filterParams = {};
    if ("tradingForm" in router.query) {
      delete router.query.tradingForm;
    }
    if ("isFurnitue" in router.query) {
      delete router.query.isFurnitue;
    }
    if ("hasVideo" in router.query) {
      delete router.query.hasVideo;
    }
    if ("address" in router.query) {
      delete router.query.address;
    }
    if ("category" in router.query) {
      delete router.query.category;
    }
    if ("priceRange" in router.query) {
      delete router.query.priceRange;
    }

    if ("areaRange" in router.query) {
      delete router.query.areaRange;
    }
    filterParams.tradingForm = tradingForm;
    filterParams.isFurnitue = furniture;
    filterParams.hasVideo = hasVideo;
    filterParams.address = selectedProvince?.value
      ? `${selectedProvince.value}${
          selectedDistrict?.value ? "," + selectedDistrict?.value : ""
        }${selectedWard?.value ? "," + selectedWard.value : ""}`
      : null;
    filterParams.category = `${category
      .filter((item) => item.isChecked)
      .map((i) => i.id)
      .join(",")}`;

    const q = Object.fromEntries(
      Object.entries(filterParams).filter(([_, v]) => v)
    );
    let queryTemp = [];
    for (const key in q) {
      queryTemp.push(`${key}=${q[key]}`);
    }
    setShow(false);
    router.push(`/filter?${queryTemp.join("&")}`);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full h-screen bg-base-100 transition-all duration-300 z-30 ${
        show ? "" : "translate-y-full"
      }`}
    >
      <HeaderPopupFilter setShow={setShow} />
      <div className={"flex flex-col space-y-5 px-2 overflow-y-auto h-full pb-32"}>
        {/*<FeatureSection isSmall={true}/>*/}
        <Collapse title={"Môn học"}>
          <ItemSelect checked={checked} label={'Toán Học'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Vật Lý'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Hóa học'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Sinh Học'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Lịch Sử'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Địa Lý'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'GDCD'} handleSelect={() => {
            setChecked(!checked)
          }}/>
        </Collapse>
        <Collapse title={"Độ khó"}>
          <ItemSelect checked={checked} label={'Cơ bản'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Trung bình'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Nâng cao'} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Khó'} handleSelect={() => {
            setChecked(!checked)
          }}/>
        </Collapse>
        <Collapse title={"Đánh giá"}>
          <ItemSelect checked={checked} label={'⭐⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'⭐⭐⭐'} hasIcon={true} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'⭐⭐'} hasIcon={true} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'⭐'} hasIcon={true} handleSelect={() => {
            setChecked(!checked)
          }}/>
          <ItemSelect checked={checked} label={'Không có'} handleSelect={() => {
            setChecked(!checked)
          }}/>
        </Collapse>
        <Collapse title={'Số lượng câu hỏi tối đa'}>
          <div
              className={'text-base text-center border-b-[1px] border-b-gray-300 pb-3 select-none px-3'}>
            <div className={'mb-3'}>1 câu ~ 500 câu</div>
            <InputRange
                maxValue={500}
                minValue={1}
                value={maxNumQuestion}
                onChange={value => setMaxNumQuestion(value)}/>
            <div
                className={'mt-3'}>{maxNumQuestion === 1 ? 'Không giới hạn' : `${maxNumQuestion} câu`}</div>
          </div>
        </Collapse>
        <Collapse title={'Thời gian làm bài tối đa'}>
          <div
              className={'text-base text-center border-b-[1px] border-b-gray-300 pb-3 select-none px-3'}>
            <div className={'mb-3'}>0 phút ~ 360 phút</div>
            <InputRange
                maxValue={360}
                minValue={0}
                value={timeToDo}
                onChange={value => setTimeToDo(value)}/>
            <div className={'mt-3'}>{timeToDo === 0 ? 'Không giới hạn' : `${timeToDo} phút`}</div>
          </div>
        </Collapse>
      </div>
      <div className="bg-base-100 fixed bottom-0 pb-5 left-1/2 -translate-x-2/4 w-full flex items-center space-x-3 px-2">
        <ButtonPrimary
          title="Áp dụng"
          className="w-full"
          handleClick={handleApply}
        />
        <ButtonPrimary title="Đặt lại" className="w-full" isPrimary={false} />
      </div>
    </div>
  );
};

export default FilterPopup;

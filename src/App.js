import { useState } from "react";

function App() {
  const [technicianType, setTechnicianType] = useState("سمكره");
  const [achievedMoney, setAchievedMovey] = useState("");
  const [salary, setSalary] = useState("");
  const [output, setOutput] = useState();
  const [achievedMoneyTouched, setAchievedMoneyTouched] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [SalaryTouched, setSalaryTouched] = useState(false);
  const salaryIsNegative = salary < 0;
  const achievedMoneyIsNegative = achievedMoney < 0;
  const achievedMoneyIsValid = achievedMoney.trim() !== "";
  const salaryIsValid = salary.trim() !== "";
  const achievedMoneyIsInvalid =
    (achievedMoneyTouched && !achievedMoneyIsValid) || achievedMoneyIsNegative;
  const salaryIsInvalid = (SalaryTouched && !salaryIsValid) || salaryIsNegative;
  let feedBackMessageSalary;
  let feedBackMessageAchievedMoney;

  if (SalaryTouched && !salaryIsValid) {
    feedBackMessageSalary = "برجاء ادخال المرتب";
  } else if (salaryIsNegative) {
    feedBackMessageSalary = "المرتب لا يمكن ان يكون اقل من صفر";
  }

  if (achievedMoneyTouched && !achievedMoneyIsValid) {
    feedBackMessageAchievedMoney = "برجاء ادخال الساعات المحققه";
  } else if (achievedMoneyIsNegative) {
    feedBackMessageAchievedMoney = "الساعات المحققه لا يمكن ان تكون اقل من صفر";
  }

  const calculateHandler = () => {
    if (
      technicianType === "سمكره" ||
      technicianType === "زجاج" ||
      technicianType === "كهرباء" ||
      technicianType === "سروجي"
    ) {
      const incentive = (+achievedMoney / 292.6) * 65 - +salary;
      incentive <= 0 ? setOutput(0) : setOutput(incentive);
    }
    if (technicianType === "دهان") {
      const incentive = (+achievedMoney / 292.6) * 95 - +salary;
      incentive <= 0 ? setOutput(0) : setOutput(incentive);
    }
    if (technicianType === "ميكانيكا") {
      const incentive = (+achievedMoney / 292.6) * 63 - +salary;
      incentive <= 0 ? setOutput(0) : setOutput(incentive);
    }
  };
  const salaryInputCss = salaryIsInvalid
    ? "incentiveForm-secondLineContainer-salary-inputContainer-input invalid"
    : "incentiveForm-secondLineContainer-salary-inputContainer-input";
  const achievedMoneyCss = achievedMoneyIsInvalid
    ? "incentiveForm-firstLineContainer-hoursInputContainer-inputContainer-input invalid"
    : "incentiveForm-firstLineContainer-hoursInputContainer-inputContainer-input";
  const formatter = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="formContainer">
      <form className="incentiveForm">
        <h3 className="incentiveForm-title">حساب الحوافز</h3>
        <div className="incentiveForm-firstLineContainer">
          <div className="incentiveForm-firstLineContainer-technicianTypeContainer">
            <label
              htmlFor="technicianType"
              className="incentiveForm-firstLineContainer-technicianTypeContainer-label"
            >
              وظيفه الفني
            </label>
            <select
              name="technicianType"
              className="incentiveForm-firstLineContainer-technicianTypeContainer-technicianSelection"
              onChange={(e) => {
                setTechnicianType(e.target.value);
              }}
            >
              <option value="سمكره">سمكره</option>
              <option value="دهان">دهان</option>
              <option value="ميكانيكا">ميكانيكا</option>
              <option value="زجاج">زجاج</option>
              <option value="سروجي">سروجي</option>
              <option value="كهرباء">كهرباء</option>
            </select>
          </div>
          <div className="incentiveForm-firstLineContainer-hoursInputContainer">
            <label
              className="incentiveForm-firstLineContainer-hoursInputContainer-label"
              htmlFor="techniciansHour"
            >
              المبلغ المحقق
            </label>
            <div className="incentiveForm-firstLineContainer-hoursInputContainer-inputContainer">
              <input
                pattern="\d*"
                name="techniciansHour"
                className={achievedMoneyCss}
                type="number"
                onChange={(e) => {
                  setAchievedMovey(e.target.value);
                }}
                onBlur={(e) => {
                  setAchievedMoneyTouched(true);
                }}
              />
              {achievedMoneyIsInvalid && (
                <p className="achievedMoneyInvalidMessage">
                  {feedBackMessageAchievedMoney}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="incentiveForm-secondLineContainer">
          <div className="incentiveForm-secondLineContainer-salary">
            <label
              className="incentiveForm-secondLineContainer-salary-label"
              htmlFor="salary"
            >
              المرتب قبل الخصومات
            </label>
            <div className="incentiveForm-secondLineContainer-salary-inputContainer">
              <input
                pattern="\d*"
                className={salaryInputCss}
                type="number"
                name="salary"
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
                onBlur={(e) => {
                  setSalaryTouched(true);
                }}
              />
              {salaryIsInvalid && (
                <p className="salaryInvalidMessage">{feedBackMessageSalary}</p>
              )}
            </div>
          </div>
        </div>
        <button
          className="button button-calculate"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setAchievedMoneyTouched(true);
            setSalaryTouched(true);
            if (achievedMoneyIsInvalid || salaryIsInvalid) {
              return;
            }

            calculateHandler();
            setShowOutput(true);
          }}
        >
          حساب
        </button>
        <hr className="redLine" />
        {!salaryIsInvalid && !achievedMoneyIsInvalid && showOutput && (
          <div className="outputContainer">
            <p className="outputContainer-text">: الحوافز المتوقعه </p>
            <p className="outputContainer-output">{formatter.format(output)}</p>
          </div>
        )}
        <ul className="copyrightText">
          <li>هذا البرنامج غير رسمي ولا يمت للاداره بأي صله *</li>

          <li>هذا البرنامج لمساعده الفنيين لأحتساب حوافزهم التقريبيه *</li>
          <li>
            الحوافز المحتسبه هي فقط الحوافز المتوقعه وقد تزيد أو تنقص حسب سياسه
            الشركه *
          </li>

          <li>هذا البرنامج خاص ب فرع السمكره و الدهان ب ابو رواش *</li>
          <li>
            هذا البرنامج ملك للمهندس
            <a
              className="mohamedIsmaiel"
              href="https://www.linkedin.com/in/mohamed-ali-7a5017103/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              محمد اسماعيل
            </a>{" "}
            ك تصميم و تنفيذ *
          </li>
        </ul>
      </form>
    </div>
  );
}

export default App;

import React, { useState, useCallback, useRef, useEffect } from "react";

import { Input } from "../../components";
import styles from "./styles.module.sass";
import { calculateSalaryFrom } from "../../utils/salary";
import { formatMoney } from "../../utils/formatter";

const HomePage = () => {
  const [bruteSalary, setBruteSalary] = useState(0);

  const onChangeBruteSalary = useCallback(
    ({ target }) => {
      if (target.value.length > 0) setBruteSalary(parseFloat(target.value));
      else setBruteSalary(0);
    },
    [bruteSalary]
  );

  const calculation = calculateSalaryFrom(bruteSalary);
  const percentages = {
    discountINSS: ((calculation.discountINSS / bruteSalary || 0) * 100).toFixed(
      2
    ),
    discountIRPF: ((calculation.discountIRPF / bruteSalary || 0) * 100).toFixed(
      2
    ),
    netSalary: ((calculation.netSalary / bruteSalary || 0) * 100).toFixed(2),
  };

  // const sum = Object.values(percentages).reduce(
  //   (prev, curr) => prev + parseFloat(curr),
  //   0
  // );

  // if (sum > 100.0) {
  //   percentages.netSalary -= sum - 100;
  // }

  return (
    <div className="container">
      <h1 className="center">React Salário</h1>

      <div className="row">
        <div className="col s12">
          <div className="input-field col s12">
            <Input
              name="brute-salary"
              label="Salário bruto"
              placeholder=""
              size="s12"
              onChange={onChangeBruteSalary}
              value={bruteSalary}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <div className="input-field col s12">
            <Input
              className="result-input"
              name="inss-base"
              label="Base INSS"
              placeholder=""
              value={formatMoney(calculation.baseINSS)}
            />
            <Input
              className="result-input orange-text text-darken-1"
              name="inss-discount"
              label="Desconto INSS"
              placeholder=""
              value={`${formatMoney(calculation.discountINSS)} (${
                percentages.discountINSS
              }%)`}
            />

            <Input
              className="result-input"
              name="irpf-base"
              label="Base IRPF"
              placeholder=""
              value={formatMoney(calculation.baseIRPF)}
            />
            <Input
              className="result-input red-text text-darken-1"
              name="irpf-discount"
              label="Desconto IRPF"
              placeholder=""
              value={`${formatMoney(calculation.discountIRPF)} (${
                percentages.discountIRPF
              }%)`}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <div className="input-field col s12">
            <Input
              className="result-input teal-text text-darken-1"
              name="liquid-salary"
              label="Salário líquido"
              placeholder=""
              value={`${formatMoney(calculation.netSalary)} (${
                percentages.netSalary
              }%)`}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <div className={styles.bar}>
            <div
              className={styles.part}
              style={{ width: percentages.discountINSS + "%" }}
            ></div>
            <div
              className={styles.part}
              style={{ width: percentages.discountIRPF + "%" }}
            ></div>
            <div
              className={styles.part}
              style={{ width: percentages.netSalary + "%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

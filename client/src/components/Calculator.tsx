import React, {FC, useContext, useState} from 'react';
import {Context} from '../index'
import {observer} from "mobx-react-lite";


const Calculator: FC = () => {
    const [salary, setSalary] = useState<number>(0)
    return (
        <div className="calculator-container">
            <h2 className="">Calculator</h2>
             <input 
             className='salaryInput'
                onChange={e => setSalary(+e.target.value )} 
                value={salary > 0? salary: ""}
                type="number" 
                placeholder='salary' 
            />
            <div className="number-container">           
                <div className="number">Necessities: {(salary/2).toFixed(1)} $</div>
                <div className="number">Wants: {(salary/3).toFixed(1)} $</div>
                <div className="number">Savings: {(salary/5).toFixed(1)} $</div>
            </div>
        </div>
    );
};

export default observer(Calculator);
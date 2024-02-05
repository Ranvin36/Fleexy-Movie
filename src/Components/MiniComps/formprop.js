import React, { useState } from 'react';
import {BsCheckCircle} from "react-icons/bs"
import {RxCrossCircled} from "react-icons/rx"

function FormProp({ placeholder, onChange, type, setting, error, valid }) {
    return (
        <div className="form-item">
            <div className="form-prop" style={error?{"border":"1px solid red"}: valid?{"border":"1px solid green"}:null}>
                <input
                    type={type}
                    placeholder={placeholder}
                    name="confirm-password"
                    className="form-control"
                    onChange={setting?(e) => setting(e.target.value):null}
                    onInput={onChange}
                />
                {error? <RxCrossCircled className="error" size={27}/> : valid? <BsCheckCircle className='valid' size={25}/> : null}

            </div>
        </div>
    );
}

export default FormProp;

import React from "react";

import { Input } from "reactstrap";

import { useForm } from "../../providers/form"

const Login = ({name, onChange, ...rest}) => {
    const { data, setData } = useForm();

    const HandleOnChange = (e) => {
        e.preventDefault();
        
        setData({ ...data, [name]: e.target.value })

        onChange && onChange({e, setData});
    };

    return (
        <Input
            onChange={HandleOnChange}
            {...rest}
        />
    );
}

export default Login;
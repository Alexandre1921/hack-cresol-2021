import React from "react";
import {
    DropdownMenu as DropdownMenuContainer,
    DropdownItem,
  } from "reactstrap";

import { useAuth } from "../../hooks/auth";

const DropdownMenu = ({Link}) =>{
    const { signOut } = useAuth();
    
    const HandleOnClickSignOut = (e) => {
        signOut();
    }

    return (
        <DropdownMenuContainer className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Bem vindo!</h6>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>Minha conta</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#pablo" onClick={HandleOnClickSignOut}>
                <i className="ni ni-user-run" />
                <span>Encerrar sessão</span>
            </DropdownItem>
        </DropdownMenuContainer>
    );
};

export default DropdownMenu;
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Container from "@mui/material/Container";
import {useDispatch} from "react-redux";
//import {setCurrentPageTileAC} from "../store/pagination-reducer";

//new imports
//import {setCurrentPageAPITileAC} from "../../store/new_reducers/pagination-api-reducer";

type VideoPaginationRouterPropsType = {
    numPages: number,
    page: number,
    changePageFunc: (page: number) => void
}

export default function _VideoPaginationRouter(props: VideoPaginationRouterPropsType) {
    //const dispatch = useDispatch();
    const handleChangeTileView = (event: React.ChangeEvent<unknown>, value: number) => {
        //dispatch(setCurrentPageAPITileAC(value))
        props.changePageFunc(value);
    };
    return (
        <Container sx={{display: 'flex', justifyContent: 'center', pt: 2, pb: 2}}>
            <Pagination count={props.numPages} page={props.page} onChange={handleChangeTileView}/>
        </Container>
    );
}

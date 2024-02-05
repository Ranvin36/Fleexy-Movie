import { Pagination } from "@mui/material"

function PaginationComp({handlePageChange}){
    return(
        <div  className="pagination-outline">
            <Pagination count={450} variant="outlined" color="primary" onChange={(e,number)=>handlePageChange(number)} style={{color:"#fff"}} />
      </div>
    )
}

export default PaginationComp
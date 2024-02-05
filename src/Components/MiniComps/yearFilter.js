import { BiDownArrow } from "react-icons/bi";

function FilterSection({FilterYears, DateToggle, toggled, YearFilter}){
   return(
    <div className="filter-sections">
          <div className="year-box">
            <div className="box-elements">
              <div className="box-inner" onClick={DateToggle}>
                <BiDownArrow
                  color="#121431"
                  className={`arrow ${toggled ? "rotate" : ""}`}
                  size={20}
                />
                <li>
                  <a>Released Date</a>
                  <div className={`dropdown ${toggled ? "open" : "close"}`}>
                    <div className="dropdown-options">
                      {FilterYears().map((year) => (
                          <div className="option" key={year} onClick={()=>YearFilter(year)}>
                          {year}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
   ) 
}

export default FilterSection
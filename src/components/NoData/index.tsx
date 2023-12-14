import "./noData.css"
import NoDataImage from "../../assets/NoData.svg";


const NoData = () => {
    return <>
        <div className="no-data">
            <img className="no-data-img" src={NoDataImage}/>
        </div>
    </>
}

export default NoData;
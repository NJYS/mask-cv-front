import PropTypes from  'prop-types';
import "../styles/Result.scss";
const Result = ({result}) =>{
    return (
        <p id="res">{result}</p>
    )
}

Result.defaultProps={
    result: '',
}


Result.propTypes = {
    result: PropTypes.string.isRequired,
}
export default Result
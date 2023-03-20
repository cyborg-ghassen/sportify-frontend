export const ErrorMessage = ({errors, error}) => {
    return (
        <div>
            {errors && error ?
                <p style={{color: "red", fontSize: "15px"}}>
                    {error}
                </p> : ""}
        </div>
    )
};
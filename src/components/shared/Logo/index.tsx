import logo from "@/assets/logo.webp"

interface IProps {
    width?: string,
    height?: string
}
const Logo = ({ width = '120px', height = '100px' }: IProps) => {
    return (
        <div>
            <img src={logo} width={width} height={height} />
        </div>
    )
}

export default Logo

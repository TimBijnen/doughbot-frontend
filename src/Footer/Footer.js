import FooterItem from "./Item"
import { CoinIcon, LogIcon, WalletIcon } from "../Icon"


const Footer = () => (
    <footer className="d-flex shadow-lg">
        <FooterItem link="/oversold">
            <CoinIcon />
        </FooterItem>
        <FooterItem link="/wallet">
            <WalletIcon />
        </FooterItem>
        <FooterItem link="/log">
            <LogIcon />
        </FooterItem>
    </footer>
)

export default Footer
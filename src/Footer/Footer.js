import FooterItem from "./Item"
import { ProjectorIcon, HomeIcon, TradesIcon, CoinIcon, LogIcon, WalletIcon, SettingsIcon, Piggy } from "../Icon"
import { useAuth } from "../Auth"


const Footer = () => {
    const [ { user } ] = useAuth()

    return (
        <footer className="d-flex shadow-lg">
            { user && (
                <>
                    <FooterItem link="/">
                        <HomeIcon />
                    </FooterItem>
                    <FooterItem link="/oversold">
                        <CoinIcon />
                    </FooterItem>
                    <FooterItem link="/wallet">
                        <WalletIcon />
                    </FooterItem>
                    <FooterItem link="/sirb">
                        <Piggy />
                    </FooterItem>
                    <FooterItem link="/trades">
                        <TradesIcon />
                    </FooterItem>
                    <FooterItem link="/log">
                        <LogIcon />
                    </FooterItem>
                    <FooterItem link="/settings">
                        <SettingsIcon />
                    </FooterItem>
                    <FooterItem link="/simulations">
                        <ProjectorIcon />
                    </FooterItem>
                </>
            ) }
        </footer>
    )
}
export default Footer
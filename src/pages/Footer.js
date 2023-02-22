import '../index.css';

const Footer = () => {
    const currentYear = (new Date().getFullYear())
    const yearTxt = currentYear === 2022 ? "2022" : "2022 - " + currentYear
    
    return (
        <div class="footer">
            © {yearTxt} Epic Threat Model - Developed by Matthew Boddy
        </div>
    )
}

export default Footer;
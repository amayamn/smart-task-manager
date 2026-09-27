import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div style={styles.page}>

            {/* =========================
                TOP LINE
            ========================= */}
            <div style={styles.topLine}></div>

            {/* =========================
                NAVBAR
            ========================= */}
            <header style={styles.navbar}>

                <div style={styles.navContainer}>

                    {/* LOGO */}
                    <div style={styles.logoArea}>

                        <div style={styles.logoBox}>
                            ST
                        </div>

                        <div style={styles.logoText}>

                            <div style={styles.logoTitle}>
                                SMART TASK
                            </div>

                            <div style={styles.logoSubtitle}>
                                PRODUCTIVITY WORKSPACE
                            </div>

                        </div>

                    </div>


                    {/* NAVIGATION */}
                    <nav style={styles.navLinks}>

                        <span
                            style={styles.navLinkActive}
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                })
                            }
                        >
                            HOME
                        </span>

                        <span
                            style={styles.navLink}
                            onClick={() =>
                                document
                                    .getElementById("about")
                                    .scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            ABOUT
                        </span>

                        <span
                            style={styles.navLink}
                            onClick={() =>
                                document
                                    .getElementById("features")
                                    .scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            FEATURES
                        </span>

                        <span
                            style={styles.navLink}
                            onClick={() => navigate("/login")}
                        >
                            LOGIN
                        </span>

                    </nav>

                </div>

            </header>


            {/* =========================
                HERO
            ========================= */}
            <section style={styles.hero}>

                <div style={styles.heroPattern}></div>

                <div style={styles.heroContent}>

                    <div style={styles.heroSmallTitle}>
                        SMART TASK MANAGEMENT SYSTEM
                    </div>

                    <h1 style={styles.heroTitle}>
                        Organize.
                        <br />
                        Track. Complete.
                    </h1>

                    <p style={styles.heroText}>
                        A simple and professional workspace designed
                        to help you organize your tasks, monitor your
                        progress and complete your work efficiently.
                    </p>

                    <div style={styles.heroButtons}>

                        {/* GET STARTED */}

                        <button
                            style={styles.primaryButton}
                            onClick={() => navigate("/login")}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "#FFFFFF";

                                e.currentTarget.style.color =
                                    "#302B4A";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "#302B4A";

                                e.currentTarget.style.color =
                                    "#FFFFFF";
                            }}
                        >
                            GET STARTED

                            <span style={styles.buttonArrow}>
                                →
                            </span>

                        </button>


                        {/* ADMIN LOGIN */}

                        <button
                            style={styles.secondaryButton}
                            onClick={() =>
                                navigate("/admin-login")
                            }

                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "#FFFFFF";

                                e.currentTarget.style.color =
                                    "#302B4A";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";

                                e.currentTarget.style.color =
                                    "#FFFFFF";
                            }}
                        >
                            ADMIN LOGIN

                            <span style={styles.buttonArrow}>
                                →
                            </span>

                        </button>

                    </div>

                </div>


                {/* DECORATIVE BOX */}

                <div style={styles.heroDecoration}>

                    <div style={styles.decorationLine}></div>

                    <div style={styles.decorationGrid}>

                        <span></span>
                        <span></span>
                        <span></span>

                        <span></span>
                        <span></span>
                        <span></span>

                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                </div>

            </section>


            {/* =========================
                INTRO
            ========================= */}

            <section
                id="about"
                style={styles.intro}
            >

                <div style={styles.introLabel}>
                    ABOUT SMART TASK
                </div>

                <h2 style={styles.introTitle}>
                    Everything you need to
                    <br />
                    manage your work.
                </h2>

                <p style={styles.introText}>
                    Smart Task provides a clean workspace where users
                    can create tasks, update their progress and manage
                    their daily work from one simple dashboard.
                </p>

            </section>


            {/* =========================
                FEATURES
            ========================= */}

            <section
                id="features"
                style={styles.featureSection}
            >

                <div style={styles.sectionHeading}>

                    <div style={styles.sectionLabel}>
                        WORKSPACE
                    </div>

                    <h2 style={styles.sectionTitle}>
                        Built for productive work
                    </h2>

                </div>


                <div style={styles.featuresGrid}>

                    {/* FEATURE 1 */}

                    <div
                        style={styles.featureCard}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-5px)";

                            e.currentTarget.style.borderColor =
                                "#8B82B8";

                            e.currentTarget.style.boxShadow =
                                "0 12px 25px rgba(98,90,145,.12)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0)";

                            e.currentTarget.style.borderColor =
                                "#D8D3E8";

                            e.currentTarget.style.boxShadow =
                                "none";
                        }}
                    >

                        <div style={styles.featureNumber}>
                            01
                        </div>

                        <div style={styles.featureIcon}>
                            ✓
                        </div>

                        <h3 style={styles.featureTitle}>
                            ORGANIZE
                        </h3>

                        <p style={styles.featureText}>
                            Create and organize your tasks in
                            one convenient workspace.
                        </p>

                        <div style={styles.featureArrow}>
                            →
                        </div>

                    </div>


                    {/* FEATURE 2 */}

                    <div
                        style={styles.featureCard}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-5px)";

                            e.currentTarget.style.borderColor =
                                "#8B82B8";

                            e.currentTarget.style.boxShadow =
                                "0 12px 25px rgba(98,90,145,.12)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0)";

                            e.currentTarget.style.borderColor =
                                "#D8D3E8";

                            e.currentTarget.style.boxShadow =
                                "none";
                        }}
                    >

                        <div style={styles.featureNumber}>
                            02
                        </div>

                        <div style={styles.featureIcon}>
                            %
                        </div>

                        <h3 style={styles.featureTitle}>
                            TRACK
                        </h3>

                        <p style={styles.featureText}>
                            Monitor task progress and understand
                            how much work has been completed.
                        </p>

                        <div style={styles.featureArrow}>
                            →
                        </div>

                    </div>


                    {/* FEATURE 3 */}

                    <div
                        style={styles.featureCard}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-5px)";

                            e.currentTarget.style.borderColor =
                                "#8B82B8";

                            e.currentTarget.style.boxShadow =
                                "0 12px 25px rgba(98,90,145,.12)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0)";

                            e.currentTarget.style.borderColor =
                                "#D8D3E8";

                            e.currentTarget.style.boxShadow =
                                "none";
                        }}
                    >

                        <div style={styles.featureNumber}>
                            03
                        </div>

                        <div style={styles.featureIcon}>
                            →
                        </div>

                        <h3 style={styles.featureTitle}>
                            COMPLETE
                        </h3>

                        <p style={styles.featureText}>
                            Stay focused and finish your work
                            efficiently and on time.
                        </p>

                        <div style={styles.featureArrow}>
                            →
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                LOGIN SECTION
            ========================= */}

            <section style={styles.loginSection}>

                <div style={styles.loginContent}>

                    <div style={styles.loginLabel}>
                        SMART WORKSPACE
                    </div>

                    <h2 style={styles.loginTitle}>
                        Ready to manage your tasks?
                    </h2>

                    <p style={styles.loginText}>
                        Choose your workspace and get started.
                    </p>

                </div>


                <div style={styles.loginCards}>

                    {/* USER */}

                    <button
                        style={styles.loginCard}
                        onClick={() => navigate("/login")}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "#EEEAF8";

                            e.currentTarget.style.transform =
                                "translateY(-4px)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "#FFFFFF";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >

                        <div style={styles.loginIcon}>
                            U
                        </div>

                        <div style={styles.loginCardContent}>

                            <div style={styles.loginCardTitle}>
                                USER WORKSPACE
                            </div>

                            <div style={styles.loginCardText}>
                                Create and manage your tasks
                            </div>

                        </div>

                        <div style={styles.loginArrow}>
                            →
                        </div>

                    </button>


                    {/* ADMIN */}

                    <button
                        style={styles.loginCard}
                        onClick={() =>
                            navigate("/admin-login")
                        }

                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "#EEEAF8";

                            e.currentTarget.style.transform =
                                "translateY(-4px)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "#FFFFFF";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >

                        <div style={styles.loginIcon}>
                            A
                        </div>

                        <div style={styles.loginCardContent}>

                            <div style={styles.loginCardTitle}>
                                ADMIN WORKSPACE
                            </div>

                            <div style={styles.loginCardText}>
                                Manage users and monitor tasks
                            </div>

                        </div>

                        <div style={styles.loginArrow}>
                            →
                        </div>

                    </button>

                </div>

            </section>


            {/* =========================
                FOOTER
            ========================= */}

            <footer style={styles.footer}>

                <div style={styles.footerContainer}>

                    <div style={styles.footerBrand}>
                        SMART TASK
                    </div>

                    <div style={styles.footerText}>
                        PRODUCTIVITY WORKSPACE
                    </div>

                    <div style={styles.footerCopyright}>
                        © 2026 Smart Task Manager
                    </div>

                </div>

            </footer>

        </div>
    );
}


/* =========================================================
   LAVENDER STYLES
   ========================================================= */

const styles = {

    /* =========================
       PAGE
    ========================= */

    page: {
        minHeight: "100vh",
        width: "100%",

        background: "#FFFFFF",

        color: "#302B4A",

        fontFamily:
            "Arial, Helvetica, sans-serif",

        boxSizing: "border-box"
    },


    /* =========================
       TOP LINE
    ========================= */

    topLine: {
        height: "4px",
        width: "100%",

        background:
            "linear-gradient(90deg, #6F659E, #A69DD0, #6F659E)"
    },


    /* =========================
       NAVBAR
    ========================= */

    navbar: {
        width: "100%",

        background: "#FFFFFF",

        borderBottom:
            "1px solid #E1DDED"
    },


    navContainer: {
        width: "88%",
        maxWidth: "1180px",

        margin: "0 auto",

        minHeight: "82px",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between"
    },


    /* =========================
       LOGO
    ========================= */

    logoArea: {
        display: "flex",

        alignItems: "center",

        gap: "11px"
    },


    logoBox: {
        width: "39px",

        height: "39px",

        border:
            "1px solid #9B92C1",

        background: "#F4F1FA",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "10px",

        fontWeight: "900",

        color: "#4B426D",

        letterSpacing: "1px"
    },


    logoText: {
        textAlign: "left"
    },


    logoTitle: {
        fontSize: "13px",

        fontWeight: "900",

        letterSpacing: "1.4px",

        color: "#302B4A"
    },


    logoSubtitle: {
        marginTop: "4px",

        fontSize: "7px",

        letterSpacing: "1.2px",

        color: "#8C879E",

        fontWeight: "700"
    },


    /* =========================
       NAVIGATION
    ========================= */

    navLinks: {
        display: "flex",

        alignItems: "center",

        gap: "30px"
    },


    navLink: {
        fontSize: "8px",

        letterSpacing: "1px",

        fontWeight: "700",

        color: "#7D778F",

        cursor: "pointer",

        transition: "all .2s ease"
    },


    navLinkActive: {
        fontSize: "8px",

        letterSpacing: "1px",

        fontWeight: "900",

        color: "#50466F",

        cursor: "pointer",

        borderBottom:
            "2px solid #8B82B8",

        paddingBottom: "7px"
    },


    /* =========================
       HERO
    ========================= */

    hero: {
        minHeight: "430px",

        position: "relative",

        overflow: "hidden",

        background:
            "linear-gradient(115deg, #8178A8 0%, #625A91 48%, #302B4A 100%)",

        display: "flex",

        alignItems: "center"
    },


    heroPattern: {
        position: "absolute",

        inset: 0,

        opacity: 0.17,

        backgroundImage:
            "radial-gradient(circle at 20% 30%, #FFFFFF 1px, transparent 2px), radial-gradient(circle at 70% 60%, #FFFFFF 1px, transparent 2px), linear-gradient(135deg, transparent 45%, rgba(255,255,255,.2) 46%, transparent 47%)",

        backgroundSize:
            "55px 55px, 75px 75px, 90px 90px"
    },


    heroContent: {
        width: "88%",

        maxWidth: "1180px",

        margin: "0 auto",

        position: "relative",

        zIndex: 2,

        padding: "70px 0"
    },


    heroSmallTitle: {
        fontSize: "8px",

        fontWeight: "900",

        letterSpacing: "2px",

        color: "#D9D4EB",

        marginBottom: "17px"
    },


    heroTitle: {
        margin: 0,

        color: "#FFFFFF",

        fontSize: "47px",

        lineHeight: "1.05",

        fontWeight: "800",

        letterSpacing: "-1.5px"
    },


    heroText: {
        maxWidth: "450px",

        marginTop: "20px",

        color: "#E7E3F1",

        fontSize: "12px",

        lineHeight: "1.8"
    },


    heroButtons: {
        display: "flex",

        gap: "11px",

        marginTop: "28px"
    },


    primaryButton: {
        border:
            "1px solid #302B4A",

        background:
            "#302B4A",

        color: "#FFFFFF",

        padding: "13px 20px",

        fontSize: "8px",

        fontWeight: "900",

        letterSpacing: "1.1px",

        cursor: "pointer",

        transition: "all .25s ease"
    },


    secondaryButton: {
        border:
            "1px solid rgba(255,255,255,.55)",

        background:
            "transparent",

        color: "#FFFFFF",

        padding: "13px 20px",

        fontSize: "8px",

        fontWeight: "900",

        letterSpacing: "1.1px",

        cursor: "pointer",

        transition: "all .25s ease"
    },


    buttonArrow: {
        marginLeft: "15px",

        fontSize: "13px"
    },


    /* =========================
       HERO DECORATION
    ========================= */

    heroDecoration: {
        position: "absolute",

        right: "8%",

        bottom: "45px",

        width: "230px",

        height: "150px",

        borderTop:
            "1px solid rgba(255,255,255,.4)",

        borderRight:
            "1px solid rgba(255,255,255,.4)",

        opacity: 0.8
    },


    decorationLine: {
        position: "absolute",

        top: "30px",

        left: "-40px",

        width: "120px",

        height: "1px",

        background: "#B8B0DA",

        transform: "rotate(-45deg)"
    },


    decorationGrid: {
        position: "absolute",

        right: "25px",

        top: "35px",

        display: "grid",

        gridTemplateColumns:
            "repeat(3, 16px)",

        gap: "14px"
    },


    /* =========================
       INTRO
    ========================= */

    intro: {
        width: "88%",

        maxWidth: "850px",

        margin: "0 auto",

        padding: "75px 0 65px",

        textAlign: "center"
    },


    introLabel: {
        color: "#746AA0",

        fontSize: "8px",

        fontWeight: "900",

        letterSpacing: "1.8px",

        marginBottom: "13px"
    },


    introTitle: {
        margin: 0,

        color: "#302B4A",

        fontSize: "31px",

        lineHeight: "1.2",

        fontWeight: "800",

        letterSpacing: "-.5px"
    },


    introText: {
        maxWidth: "600px",

        margin: "20px auto 0",

        color: "#7B7687",

        fontSize: "11px",

        lineHeight: "1.8"
    },


    /* =========================
       FEATURES
    ========================= */

    featureSection: {
        width: "88%",

        maxWidth: "1180px",

        margin: "0 auto",

        padding: "15px 0 80px"
    },


    sectionHeading: {
        marginBottom: "25px"
    },


    sectionLabel: {
        color: "#746AA0",

        fontSize: "8px",

        fontWeight: "900",

        letterSpacing: "1.5px",

        marginBottom: "8px"
    },


    sectionTitle: {
        margin: 0,

        color: "#302B4A",

        fontSize: "24px",

        fontWeight: "800"
    },


    featuresGrid: {
        display: "grid",

        gridTemplateColumns:
            "repeat(3, 1fr)",

        gap: "16px"
    },


    featureCard: {
        position: "relative",

        minHeight: "200px",

        padding: "25px 22px",

        background: "#FFFFFF",

        border:
            "1px solid #D8D3E8",

        transition:
            "all .25s ease",

        cursor: "default",

        boxSizing: "border-box"
    },


    featureNumber: {
        position: "absolute",

        top: "15px",

        right: "18px",

        color: "#AAA4B9",

        fontSize: "8px",

        fontWeight: "900"
    },


    featureIcon: {
        width: "36px",

        height: "36px",

        background: "#EEEAF8",

        border:
            "1px solid #CEC7E4",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        color: "#625A91",

        fontSize: "13px",

        fontWeight: "900",

        marginBottom: "18px"
    },


    featureTitle: {
        margin: 0,

        color: "#443B65",

        fontSize: "11px",

        fontWeight: "900",

        letterSpacing: "1.1px"
    },


    featureText: {
        maxWidth: "240px",

        marginTop: "10px",

        color: "#7D7889",

        fontSize: "10px",

        lineHeight: "1.7"
    },


    featureArrow: {
        position: "absolute",

        bottom: "18px",

        right: "20px",

        color: "#8178A8",

        fontSize: "17px"
    },


    /* =========================
       LOGIN SECTION
    ========================= */

    loginSection: {
        background:
            "#302B4A",

        padding: "65px 6%",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        gap: "40px",

        boxSizing: "border-box"
    },


    loginContent: {
        maxWidth: "450px"
    },


    loginLabel: {
        color: "#BDB6D9",

        fontSize: "8px",

        fontWeight: "900",

        letterSpacing: "1.7px",

        marginBottom: "11px"
    },


    loginTitle: {
        margin: 0,

        color: "#FFFFFF",

        fontSize: "28px",

        fontWeight: "800"
    },


    loginText: {
        marginTop: "11px",

        color: "#D2CDE2",

        fontSize: "10px"
    },


    loginCards: {
        display: "flex",

        flexDirection: "column",

        gap: "10px",

        width: "400px"
    },


    loginCard: {
        width: "100%",

        minHeight: "65px",

        background: "#FFFFFF",

        border:
            "1px solid #DED9EA",

        padding: "10px 15px",

        display: "flex",

        alignItems: "center",

        gap: "13px",

        cursor: "pointer",

        textAlign: "left",

        transition: "all .25s ease"
    },


    loginIcon: {
        width: "37px",

        height: "37px",

        background: "#EEEAF8",

        color: "#625A91",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "10px",

        fontWeight: "900",

        border:
            "1px solid #CEC7E4"
    },


    loginCardContent: {
        flex: 1
    },


    loginCardTitle: {
        color: "#443B65",

        fontSize: "10px",

        fontWeight: "900",

        letterSpacing: ".7px"
    },


    loginCardText: {
        color: "#858091",

        fontSize: "8px",

        marginTop: "4px"
    },


    loginArrow: {
        color: "#8178A8",

        fontSize: "18px"
    },


    /* =========================
       FOOTER
    ========================= */

    footer: {
        background:
            "#211E34",

        borderTop:
            "1px solid #494363",

        padding: "25px 0"
    },


    footerContainer: {
        width: "88%",

        maxWidth: "1180px",

        margin: "0 auto",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between"
    },


    footerBrand: {
        color: "#FFFFFF",

        fontSize: "9px",

        fontWeight: "900",

        letterSpacing: "1.5px"
    },


    footerText: {
        color: "#9992AA",

        fontSize: "7px",

        letterSpacing: "1px"
    },


    footerCopyright: {
        color: "#9992AA",

        fontSize: "7px"
    }

};

export default Home;
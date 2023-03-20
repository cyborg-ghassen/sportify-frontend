import React, {useState, useRef, useEffect} from 'react'
import {useHistory} from 'react-router';

import {useDispatch, useSelector} from 'react-redux';
import {
    theme
} from '../../../redux/customise/customiseActions';

import {Row, Col, Button, Tag} from "antd";


export default function HeaderTheme() {
    const customise = useSelector(state => state.customise)
    const dispatch = useDispatch()

    const location = useHistory()

    let themeRef = useRef([])

    const [themeLocal, setThemeLocal] = useState()
    const [themeClickCheck, setThemeClickCheck] = useState(false)

    function themeRefActive(e) {
        if (e === "light") {
            if (themeRef[0])
                themeRef[0].classList.add("active")
            if (themeRef[1])
                themeRef[1].classList.remove("active")
        }

        if (e === "dark") {
            if (themeRef[0])
                themeRef[1].classList.add("active")
            if (themeRef[1])
                themeRef[0].classList.remove("active")
        }
    }

    useEffect(() => {
        if (themeClickCheck === false) {
            if (location.location.search === "?theme=dark") {
                localStorage.setItem("theme", "dark")
                setThemeLocal("dark")
                themeRefActive("dark")
            } else if (location.location.search === "?theme=light") {
                localStorage.setItem("theme", "light")
                setThemeLocal("light")
                themeRefActive("light")
            }
        }

        if (localStorage) {
            setThemeLocal(localStorage.getItem("theme"))
        }

        if (themeLocal) {
            themeRefActive(themeLocal)
        } else {
            themeRefActive(customise.theme)
        }
    }, [themeRefActive, themeLocal, customise.theme, themeRef])

    function themeClick(index) {
        setThemeClickCheck(true)

        if (index === 0) {
            document.querySelector("body").classList.replace("dark", "light")
            localStorage.setItem("theme", "light")
            setThemeLocal("light")

            dispatch(theme("light"))
        } else {
            document.querySelector("body").classList.replace("light", "dark")
            localStorage.setItem("theme", "dark")
            setThemeLocal("dark")

            dispatch(theme("dark"))
        }

        for (let i = 0; i < themeRef.length; i++) {
            if (index === i) {
                themeRef[i].classList.add("active")
            } else {
                themeRef[i].classList.remove("active")
            }
        }
    }

    const handleThemeClick = () => {
        themeLocal === "light" ? themeClick(0) : themeClick(1)
    }

    return (
        <Col className="hp-languages hp-mr-8">
            <div className="hp-d-flex-center">
                {themeLocal === "light" ?
                    <Button
                        ref={(ref) => {
                            themeRef.current.push(ref)
                        }}
                        style={{borderRadius: "50%"}}
                        type="dashed"
                        size="small"
                        onClick={() => themeClick(1)}
                        className="hp-text-color-black-100 hp-border-color-black-100 hp-hover-text-color-black-80 hp-hover-border-color-black-80"
                    >
                        <i className="ri-moon-fill"/>

                    </Button>
                    :
                    <Button
                        ref={(ref) => {
                            themeRef.current.push(ref)
                        }}
                        style={{borderRadius: "50%"}}
                        type="dashed"
                        size="small"
                        onClick={() => themeClick(0)}
                        className="hp-text-color-white-100 hp-border-color-black-100 hp-hover-text-color-black-80 hp-hover-border-color-black-80"
                    >
                        <i className="ri-sun-fill"/>

                    </Button>

                }

            </div>
        </Col>
    );
}
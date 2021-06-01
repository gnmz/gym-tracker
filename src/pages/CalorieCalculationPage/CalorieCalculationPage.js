import React, { Component } from 'react'
import BottomMenuList from '../../components/BottomMenuList/BottomMenuList'
import BreadCrumbsGymsTracker from '../../components/BreadCrumbsGymsTracker/BreadCrumbsGymsTracker'
import Header from '../../components/Header'
import NavigationSidebar from '../../components/NavigationSidebar/NavigationSidebar'
import './CalorieCalculationPage.css'

export class CalorieCalculationPage extends Component {
    state = {
        calorieCalculatePage: [
            { id: 1, title: "Главная", link: "/main" },
            { id: 2, title: "Калькулятор калорий", link: "/calorie-calculation" }
        ],
        sidebarItemActive: "calorie-calculation",
        gender: '',
        weight: '',
        height: '',
        age: ''

    }
// Для женщин: (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) − 161
// Для мужчин: (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) + 5

    calculateCalorie = () => {
        const {gender, weight, height, age} = this.state;
        if (gender === 'male') {
            let result = (10 * weight + 6.25 * height - 5 * age + 5) * 1.375;
            console.log(result)
        }

        if (gender === 'female') {
            let result = (10 * weight + 6.25 * height - 5 * age - 161) * 1.375
            console.log(Math.floor(result))
        }
    }

    weightHandler =(e) => {
        this.setState({weight: e.target.value})
    }

    heightHandler = (e) => {
        this.setState({height: e.target.value})
    }

    ageHandler = (e) => {
        this.setState({age: e.target.value})
    }

    radioHandler = (e) => {
        this.setState({gender: e.target.value})
    }


    render() {
        const {weight, height, age, gender} = this.state;
        return (
            <div className="calorie-calculation-page">
                <BottomMenuList />
                <Header />
                <BreadCrumbsGymsTracker breadCrumb={this.state.calorieCalculatePage} />
                <div className="calorie-calculation-page-wrapper">
                    <NavigationSidebar acitveItem={this.state.sidebarItemActive} />
                    <div className="calorie-calculation-page-wrapper__content">
                    <h1>Calorie Calculation Page</h1>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div onChange={this.radioHandler}>
                            Укажите пол
                            <input type='radio' value="male" name='gender' id='male' /><label htmlFor="male">Мужчина</label>
                            <input type='radio' value="female" name='gender' id='female' /><label htmlFor="female">Женщина</label>
                        </div>
                        <label> Рост
                        <input type='text' value={height} onChange={this.heightHandler} /></label>
                        <label> Вес
                        <input type='text' value={weight} onChange={this.weightHandler} /></label>
                        <label> Возраст
                        <input type='text' value={age} onChange={this.ageHandler} /></label>
                    </div>
                    <button onClick={this.calculateCalorie} disabled={(height === '' || weight === '' || gender === '' || age === '') ? true : false}>calculate</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CalorieCalculationPage
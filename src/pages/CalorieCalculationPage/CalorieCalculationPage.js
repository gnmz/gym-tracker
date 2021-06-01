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
    }
    render() {
        return (
            <div className="calorie-calculation-page">
                <BottomMenuList />
                <Header />
                <BreadCrumbsGymsTracker breadCrumb={this.state.calorieCalculatePage} />
                <div className="calorie-calculation-page-wrapper">
                    <NavigationSidebar acitveItem={this.state.sidebarItemActive} />
                    <div className="calorie-calculation-page-wrapper__content">
                    <h1>Calorie Calculation Page</h1>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CalorieCalculationPage
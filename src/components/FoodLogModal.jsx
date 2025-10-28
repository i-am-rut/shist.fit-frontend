import { useState } from "react"
import api from "../utils/api"
import { notifyError, notifySuccess } from "../utils/toasts"
import { useDispatch } from "react-redux"
import { incrementTotalCalories, incrementTotalMacros, updateRecentMeals } from "../utils/slices/foodSlice"

const FoodLogModal = ({ showModal, setShowModal}) => {
    const [searchInput, setSearchInput] = useState('')
    const [error, setError] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [selectedFood, setSelectedFood] = useState('')
    const [selectedFoodData, setSelectedFoodData] = useState(null)
    const [servingIdx, setServingIdx] = useState(0)
    const [amount, setAmount] = useState(1)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [mealType, setMealType] = useState('Breakfast')

    const dispatch = useDispatch()

    const handleModalBackdropClick = (e) => {
        e.stopPropagation()
        setShowModal(false)
    }

    const handleSearchClick = async() => {
        setError('')
        const input = searchInput.trim()
        if(input.length === 0) {
            setError('Input can not be empty')
            return
        }
        try{
            const res = await api.get(`/foods/search?q=${input}`)
            setSearchResults(res.data)
        }catch(err) {
            notifyError(err.response?.data?.message || err.response?.data?.error || 'Failed to get data', 'Try again later')
        }
    }

    const handleSelectFoodVariantClick = async() => {
        try {
            const res = await api.get(`/foods/food?food_id=${selectedFood}`)
            setSelectedFoodData(res.data?.food)
        } catch (err) {
            console.error(err)
            notifyError(err.response?.data?.message || err.response?.data?.error || 'Failed to get data', '')
        }
    }

    const handleAddFoodClick = async() => {
        if((!servingIdx && servingIdx !== 0) || !date || !time || !amount || !mealType || !selectedFoodData.food_id) {
            return
        }
        try {
            const res = await api.post('/food', {food_id: selectedFoodData.food_id, mealType, date, time, amount, servingIdx}, {withCredentials: true})
            dispatch(incrementTotalCalories(res.data.entry.calories))
            dispatch(incrementTotalMacros(res.data.entry.macros))
            dispatch(updateRecentMeals(res.data.entry))
            notifySuccess(res.data.message + ' successfully!', '')
            setShowModal(false)
        } catch (err) {
            console.log(err)
            notifyError(err.response?.data?.message || err.response?.data?.error)
        }
    }

    const now = new Date().toISOString().slice(0,16)
    const timeNow = new Date().toTimeString().slice(0,5)

    return (
        <div onClick={handleModalBackdropClick} className="fixed inset-0 bg-white/60 flex items-center justify-center px-2 z-50">
            <div onClick={(e => e.stopPropagation())} className="relative bg-black rounded-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
                <div className="p-6 h-full">
                    <h2 className="text-xl sm:text-2xl lg:text-4xl border-b-2 pb-2">Add Food</h2>
                    <div className="mt-4">
                        <label htmlFor="food-search-input">Search Food:</label>
                        <div className="flex gap-4 mt-2">
                            <input 
                                id="food-search-input"
                                className="p-2 w-full rounded-lg border border-gray-600"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                type="text" 
                                placeholder="salad, smoothie..." 
                            />
                            <button 
                                className="px-4 py-2 bg-white text-black rounded-lg cursor-pointer"
                                onClick={handleSearchClick}    
                            >search</button>
                        </div>
                        {error.length > 0 ? <p className="text-red-600">{error}</p>: null}
                    </div>
                    {searchResults? (
                        <div className="flex gap-4 mt-6 flex-col">
                            <label htmlFor="select-food-variant">Select food:</label>
                            <select 
                                value={selectedFood}
                                id="select-food-variant"
                                onChange={e => setSelectedFood(e.target.value)}
                                className="p-2 bg-[#18181c] border border-gray-500 rounded-lg w-full">
                                {searchResults.map(res => (<option key={res.food_id} value={res.food_id}>
                                    {res.food_name.length > 30 ? res.food_name.substring(0, 30) + '...' : res.food_name}
                                </option>))}
                            </select>
                            <button 
                                onClick={handleSelectFoodVariantClick}
                                className="px-4 py-2 bg-white text-black rounded-lg self-end cursor-pointer">Select</button>
                        </div>
                    ): null}
                    {selectedFoodData? (
                        <div className="mt-6 border border-gray-400 rounded-xl p-2">
                            <p className="text-lg font-semibold">{selectedFoodData.food_name}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="serving-size" >Select serving:</label>
                                    <select 
                                        className="p-2 bg-[#18181c] border border-gray-500 rounded-lg w-full"
                                        value={servingIdx} 
                                        id="serving-size"
                                        onChange={e => setServingIdx(e.target.value)}
                                    >
                                        {Array.isArray(selectedFoodData.servings?.serving) ? selectedFoodData.servings?.serving.map((serv, i) => (<option value={i} key={serv.serving_id}>{`${Math.floor(serv.metric_serving_amount)}${serv.metric_serving_unit}`}</option>)) : <option value='0'>{`${Math.floor(selectedFoodData.servings?.serving.metric_serving_amount)}${selectedFoodData.servings?.serving.metric_serving_unit}`}</option>}
                                    </select>
                                </div>
                                <div>
                                    <label>Select amount:</label>
                                    <div className="flex justify-between mt-2">
                                        <button 
                                            disabled={amount === 1}
                                            onClick={() => setAmount(prev => prev - 1)}
                                            className="px-4 py-2 bg-gray-600 text-black font-bold z-0 rounded-md cursor-pointer">-</button>
                                        <p className="px-4 py-2 bg-white text-black rounded-xs">{amount}</p>
                                        <button 
                                            disabled={amount === 20}
                                            onClick={() => setAmount(prev => prev + 1)}
                                            className="px-4 py-2 bg-gray-600 text-black font-bold z-0 rounded-md cursor-pointer">+</button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="food-date">Select date</label>
                                    <input 
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        id="food-date" 
                                        className="p-2 w-full rounded-lg border border-gray-600" type="date" max={now} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="food-time">Select time:</label>
                                    <input 
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                        id="food-time" 
                                        className="p-2 w-full rounded-lg border border-gray-600" type="time" max={timeNow}/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="mealtype">Select meal-type:</label>
                                    <select 
                                        value={mealType}
                                        onChange={e => setMealType(e.target.value)}
                                        id="mealtype"
                                        className="p-2 bg-[#18181c] border border-gray-500 rounded-lg w-full"
                                    >
                                        <option value={'Breakfast'}>Breakfast</option>
                                        <option value={'Lunch'}>Lunch</option>
                                        <option value={'Snack'}>Snack</option>
                                        <option value={'Dinner'}>Dinner</option>
                                    </select>
                                </div>
                                <button 
                                    onClick={handleAddFoodClick}
                                    className="px-4 py-2 bg-white text-black rounded-lg self-end cursor-pointer">Add food +</button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default FoodLogModal

// {
//     "food_id": "2653",
//     "food_name": "Chicken or Turkey Garden Salad (Chicken and/or Turkey, Tomato and/or Carrots, Other Vegetables)",
//     "food_type": "Generic",
//     "food_url": "https://foods.fatsecret.com/calories-nutrition/generic/chicken-or-turkey-garden-salad-(chicken-and-or-turkey-tomato-and-or-carrots-other-vegetables)-no-dressing",
//     "servings": {
//         "serving": [
//             {
//                 "calcium": "16",
//                 "calories": "58",
//                 "carbohydrate": "2.13",
//                 "cholesterol": "24",
//                 "fat": "1.13",
//                 "fiber": "0.8",
//                 "iron": "0.51",
//                 "measurement_description": "cup",
//                 "metric_serving_amount": "90.000",
//                 "metric_serving_unit": "g",
//                 "monounsaturated_fat": "0.369",
//                 "number_of_units": "1.000",
//                 "polyunsaturated_fat": "0.275",
//                 "potassium": "185",
//                 "protein": "9.49",
//                 "saturated_fat": "0.310",
//                 "serving_description": "1 cup",
//                 "serving_id": "8300",
//                 "serving_url": "https://foods.fatsecret.com/calories-nutrition/generic/chicken-or-turkey-garden-salad-(chicken-and-or-turkey-tomato-and-or-carrots-other-vegetables)-no-dressing?portionid=8300&portionamount=1.000",
//                 "sodium": "32",
//                 "sugar": "1.27",
//                 "vitamin_a": "35",
//                 "vitamin_c": "6.1"
//             },
//             {
//                 "calcium": "18",
//                 "calories": "64",
//                 "carbohydrate": "2.37",
//                 "cholesterol": "27",
//                 "fat": "1.25",
//                 "fiber": "0.9",
//                 "iron": "0.57",
//                 "measurement_description": "g",
//                 "metric_serving_amount": "100.000",
//                 "metric_serving_unit": "g",
//                 "monounsaturated_fat": "0.410",
//                 "number_of_units": "100.000",
//                 "polyunsaturated_fat": "0.306",
//                 "potassium": "206",
//                 "protein": "10.54",
//                 "saturated_fat": "0.344",
//                 "serving_description": "100 g",
//                 "serving_id": "51333",
//                 "serving_url": "https://foods.fatsecret.com/calories-nutrition/generic/chicken-or-turkey-garden-salad-(chicken-and-or-turkey-tomato-and-or-carrots-other-vegetables)-no-dressing?portionid=51333&portionamount=100.000",
//                 "sodium": "36",
//                 "sugar": "1.41",
//                 "vitamin_a": "39",
//                 "vitamin_c": "6.8"
//             },
//             {
//                 "calcium": "16",
//                 "calories": "58",
//                 "carbohydrate": "2.13",
//                 "cholesterol": "24",
//                 "fat": "1.13",
//                 "fiber": "0.8",
//                 "iron": "0.51",
//                 "measurement_description": "serving (90g)",
//                 "metric_serving_amount": "90.000",
//                 "metric_serving_unit": "g",
//                 "monounsaturated_fat": "0.369",
//                 "number_of_units": "1.000",
//                 "polyunsaturated_fat": "0.275",
//                 "potassium": "185",
//                 "protein": "9.49",
//                 "saturated_fat": "0.310",
//                 "serving_description": "1 serving (90 g)",
//                 "serving_id": "9599",
//                 "serving_url": "https://foods.fatsecret.com/calories-nutrition/generic/chicken-or-turkey-garden-salad-(chicken-and-or-turkey-tomato-and-or-carrots-other-vegetables)-no-dressing?portionid=9599&portionamount=1.000",
//                 "sodium": "32",
//                 "sugar": "1.27",
//                 "vitamin_a": "35",
//                 "vitamin_c": "6.1"
//             },
//             {
//                 "calcium": "45",
//                 "calories": "161",
//                 "carbohydrate": "5.97",
//                 "cholesterol": "68",
//                 "fat": "3.15",
//                 "fiber": "2.3",
//                 "iron": "1.44",
//                 "measurement_description": "fast food order",
//                 "metric_serving_amount": "252.000",
//                 "metric_serving_unit": "g",
//                 "monounsaturated_fat": "1.034",
//                 "number_of_units": "1.000",
//                 "polyunsaturated_fat": "0.771",
//                 "potassium": "519",
//                 "protein": "26.56",
//                 "saturated_fat": "0.867",
//                 "serving_description": "1 fast food order",
//                 "serving_id": "10908",
//                 "serving_url": "https://foods.fatsecret.com/calories-nutrition/generic/chicken-or-turkey-garden-salad-(chicken-and-or-turkey-tomato-and-or-carrots-other-vegetables)-no-dressing?portionid=10908&portionamount=1.000",
//                 "sodium": "91",
//                 "sugar": "3.55",
//                 "vitamin_a": "98",
//                 "vitamin_c": "17.1"
//             },
//             {
//                 "calcium": "5",
//                 "calories": "18",
//                 "carbohydrate": "0.67",
//                 "cholesterol": "8",
//                 "fat": "0.35",
//                 "fiber": "0.3",
//                 "iron": "0.16",
//                 "measurement_description": "oz",
//                 "metric_serving_amount": "28.350",
//                 "metric_serving_unit": "g",
//                 "monounsaturated_fat": "0.116",
//                 "number_of_units": "1.000",
//                 "polyunsaturated_fat": "0.087",
//                 "potassium": "58",
//                 "protein": "2.99",
//                 "saturated_fat": "0.098",
//                 "serving_description": "1 oz",
//                 "serving_id": "181043",
//                 "serving_url": "https://foods.fatsecret.com/calories-nutrition/generic/chicken-or-turkey-garden-salad-(chicken-and-or-turkey-tomato-and-or-carrots-other-vegetables)-no-dressing?portionid=181043&portionamount=1.000",
//                 "sodium": "10",
//                 "sugar": "0.40",
//                 "vitamin_a": "11",
//                 "vitamin_c": "1.9"
//             }
//         ]
//     }
// }
import './App.css';
import {BrowserRouter as Router ,Route} from 'react-router-dom'
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import {useState ,useEffect} from 'react';
import About from './Components/About';


function App() {
    
    const [tasks,setTasks]=useState([])

    useEffect(()=>{
         const getTasks = async ()=>{
            const taskFromServer= await fetchTasks()
            setTasks(taskFromServer)
         }
         getTasks()
   
    },[])

    const fetchTasks =  async ()=>{
        const res =await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        
        return data
    }

    const fetchTask =  async (id)=>{
        const res =await fetch(`http://localhost:5000/tasks/${id}`)

        const data = await res.json()
        
        return data
    }
    
    const deleteTask = async (id)=>{
        await fetch(`http://localhost:5000/tasks/${id}`,{method:'delete'})
        setTasks(tasks.filter((task)=> task.id !==id))
        
    }
    
    const toggleReminder=async (id)=>{
        const taskToToggle= await fetchTask(id)
        const updateTask={...taskToToggle,reminder:!taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`,
                                    {method:'put' , headers:{'content-type':'application/json'}, 
                                    body:JSON.stringify(updateTask)})

        const data =await res.json()
        setTasks(tasks.map((task)=>task.id===id ? {...task,reminder:!task.reminder}:task))
    }

    const addTask= async (task)=>{
        const res = await fetch(`http://localhost:5000/tasks`,
                                {method:'post' , headers:{'content-type':'application/json'}, 
                                body:JSON.stringify(task)})

        const data =await res.json()
        setTasks([...tasks,data])                        
    }
    const [showAdd ,setShowAdd]=useState(false)


    return ( 
        <Router>
            <div className= "container" >
                <Header title="hello"  showAdd={showAdd} onAdd={()=> setShowAdd(!showAdd)}/>
                {showAdd && <AddTask onAdd={addTask}/> }
                {Tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>):('No Tasks ')}
                {/* <Route path='/about' Component={About}/> */}
                <Footer/>
            </div>
        </Router>

    );
}

export default App;
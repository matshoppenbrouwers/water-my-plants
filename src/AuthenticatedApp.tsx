import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AddPlant from './pages/AddPlant'
import PlantList from './pages/PlantList'

export function AuthenticatedApp() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<PlantList />} />
          <Route path="/add-plant" element={<AddPlant />} />
        </Routes>
      </Layout>
    </Router>
  )
}
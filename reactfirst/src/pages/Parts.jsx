import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../styles/common.css';
import './Parts.css';


const Parts = () => {
  const [activeTab, setActiveTab] = useState('creation'); 

  // States for Parts Creation Tab
  const [creationMpns, setCreationMpns] = useState(['MPN1']);
  const [creationManufacturers, setCreationManufacturers] = useState(['Manufacturer1']);
  const [creationSources, setCreationSources] = useState(['Sources1']);

  // States for Parts Edit Tab
  const [editMpns, setEditMpns] = useState(['MPN1']);
  const [editManufacturers, setEditManufacturers] = useState(['Manufacturer1']);
  const [editSources, setEditSources] = useState(['Sources1']);

  // Handle increment for MPN input in Creation Tab
  const incrementCreationMpn = () => {
    setCreationMpns([...creationMpns, `MPN${creationMpns.length + 1}`]);
  };

  // Handle decrement for MPN input in Creation Tab
  const decrementCreationMpn = () => {
    if (creationMpns.length > 1) {
      const updatedMpns = [...creationMpns];
      updatedMpns.pop();
      setCreationMpns(updatedMpns);
    }
  };

  // Handle increment for Manufacturer input in Creation Tab
  const incrementCreationManufacturer = () => {
    setCreationManufacturers([...creationManufacturers, `Manufacturer${creationManufacturers.length + 1}`]);
  };

  // Handle decrement for Manufacturer input in Creation Tab
  const decrementCreationManufacturer = () => {
    if (creationManufacturers.length > 1) {
      const updatedManufacturers = [...creationManufacturers];
      updatedManufacturers.pop();
      setCreationManufacturers(updatedManufacturers);
    }
  };

  // Handle increment for Sources input in Creation Tab
  const incrementCreationSources = () => {
    setCreationSources([...creationSources, `Sources${creationSources.length + 1}`]);
  };

  // Handle decrement for Sources input in Creation Tab
  const decrementCreationSources = () => {
    if (creationSources.length > 1) {
      const updatedSources = [...creationSources];
      updatedSources.pop();
      setCreationSources(updatedSources);
    }
  };

  // Handle increment for MPN input in Edit Tab
  const incrementEditMpn = () => {
    setEditMpns([...editMpns, `MPN${editMpns.length + 1}`]);
  };

  // Handle decrement for MPN input in Edit Tab
  const decrementEditMpn = () => {
    if (editMpns.length > 1) {
      const updatedMpns = [...editMpns];
      updatedMpns.pop();
      setEditMpns(updatedMpns);
    }
  };

  // Handle increment for Manufacturer input in Edit Tab
  const incrementEditManufacturer = () => {
    setEditManufacturers([...editManufacturers, `Manufacturer${editManufacturers.length + 1}`]);
  };

  // Handle decrement for Manufacturer input in Edit Tab
  const decrementEditManufacturer = () => {
    if (editManufacturers.length > 1) {
      const updatedManufacturers = [...editManufacturers];
      updatedManufacturers.pop();
      setEditManufacturers(updatedManufacturers);
    }
  };

  // Handle increment for Sources input in Edit Tab
  const incrementEditSources = () => {
    setEditSources([...editSources, `Sources${editSources.length + 1}`]);
  };

  // Handle decrement for Sources input in Edit Tab
  const decrementEditSources = () => {
    if (editSources.length > 1) {
      const updatedSources = [...editSources];
      updatedSources.pop();
      setEditSources(updatedSources);
    }
  };

  // Function to render the appropriate content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'creation':
        return (
          <form className="parts-form">
            <div className="form-group">
              <label>Part No</label>
              <input type="text" name="partNo" />
            </div>

            <div className="form-group">
              <label>Part Description</label>
              <input type="text" name="partDescription" />
            </div>

            <div className="form-group">
              <label>Unit of Measurement </label>
              <select name="unit">
              <option value="meter">Meter</option>
                <option value="inch">Inch</option>
                
                <option value="no">No</option>
                <option value="set">Set</option>
                <option value="activity">Activity</option>
                <option value="kg">Kg</option>
                <option value="liter">Liter</option>
                <option value="square meter">Square meter</option>   
                <option value="roll">Roll</option>
              </select>
            </div>

            {/* Dynamic MPN fields */}
            {creationMpns.map((mpn, index) => (
              <div className="form-group" key={index}>
                <label>MPN {index + 1}</label>
                <div className="input-container">
                  {index > 0 && (
                    <button type="button" onClick={decrementCreationMpn}>-</button>
                  )}
                  <input type="text" name="mpn" />
                  <button type="button" onClick={incrementCreationMpn}>+</button>
                </div>
              </div>
            ))}

            {/* Dynamic Manufacturer fields */}
            {creationManufacturers.map((manufacturer, index) => (
              <div className="form-group" key={index}>
                <label>Manufacturer {index + 1}</label>
                <div className="input-container">
                  {index > 0 && (
                    <button type="button" onClick={decrementCreationManufacturer}>-</button>
                  )}
                  <input type="text" name="manufacturer" />
                  <button type="button" onClick={incrementCreationManufacturer}>+</button>
                </div>
              </div>
            ))}

            {/* Dynamic Sources fields */}
            {creationSources.map((source, index) => (
              <div className="form-group" key={index}>
                <label>Sources {index + 1}</label>
                <div className="input-container">
                  {index > 0 && (
                    <button type="button" onClick={decrementCreationSources}>-</button>
                  )}
                  <input type="text" name="sources"  />
                  <button type="button" onClick={incrementCreationSources}>+</button>
                </div>
              </div>
            ))}

            <div className="buttons">
              <button type="submit">+ Add Part</button>
              <button type="reset">Clear</button>
            </div>
          </form>
        );

      case 'edit':
        return (
          <form className="parts-edit">
            <div className="form-group1">
              <label>Part No / MPN</label>
              <input type="text" name="partNo/mpn" />
              <select name="partMpn" className="part-select">
                <option value="partno">Part No</option>
                <option value="mpn">MPN</option>
              </select>
            </div>

            <div className="buttons">
              <button type="button" className="btn-search">Search Part</button>
              <button type="button" className="btn-edit">Edit Part</button>
              <button type="button" className="btn-discontinue">Discontinue Part</button>
              <button type="reset" className="btn-clear">Clear</button>
            </div>

            <div className="form-group1">
              <label>Part No</label>
              <input type="text" name="partNo" />
            </div>

            <div className="form-group1">
              <label>Part Description</label>
              <input type="text" name="partDescription" />
            </div>

            <div className="form-group1">
              <label>Unit of Measurement </label>
              <select name="unit">
                <option value="meter">Meter</option>
                <option value="inch">Inch</option>
                
                <option value="no">No</option>
                <option value="set">Set</option>
                <option value="activity">Activity</option>
                <option value="kg">Kg</option>
                <option value="liter">Liter</option>
                <option value="square meter">Square meter</option>   
                <option value="roll">Roll</option>  
              </select>
            </div>

            

            

            {/* Dynamic MPN fields for Edit Tab */}
            {editMpns.map((mpn, index) => (
              <div className="form-group1" key={index}>
                <label>MPN {index + 1}</label>
                <div className="input-container">
                  {index > 0 && (
                    <button type="button" onClick={decrementEditMpn}>-</button>
                  )}
                  <input type="text" name="mpn"  />
                  <button type="button" onClick={incrementEditMpn}>+</button>
                </div>
              </div>
            ))}

            {/* Dynamic Manufacturer fields for Edit Tab */}
            {editManufacturers.map((manufacturer, index) => (
              <div className="form-group1" key={index}>
                <label>Manufacturer {index + 1}</label>
                <div className="input-container">
                  {index > 0 && (
                    <button type="button" onClick={decrementEditManufacturer}>-</button>
                  )}
                  <input type="text" name="manufacturer" />
                  <button type="button" onClick={incrementEditManufacturer}>+</button>
                </div>
              </div>
            ))}

            {/* Dynamic Sources fields for Edit Tab */}
            {editSources.map((source, index) => (
              <div className="form-group1" key={index}>
                <label>Sources {index + 1}</label>
                <div className="input-container">
                  {index > 0 && (
                    <button type="button" onClick={decrementEditSources}>-</button>
                  )}
                  <input type="text" name="sources"/>
                  <button type="button" onClick={incrementEditSources}>+</button>
                </div>
              </div>
            ))}

          </form>
        );

      case 'view':
        return (
          <div>
            <h3>Parts View Tab</h3>
            {/* Add the content for Parts View tab */}
            <p>View the details of all parts here.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="parts-container">
      <Header />
      <Navbar />
      

      {/* Tabs Section */}
      <div className="tabs">
        <button
          className={activeTab === 'creation' ? 'active' : ''}
          onClick={() => setActiveTab('creation')}
        >
          Parts Creation
        </button>
        <button
          className={activeTab === 'edit' ? 'active' : ''}
          onClick={() => setActiveTab('edit')}
        >
          Parts Edit
        </button>
        <button
          className={activeTab === 'view' ? 'active' : ''}
          onClick={() => setActiveTab('view')}
        >
          Parts View
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Parts;

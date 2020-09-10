import React from 'react';


function Settings() {
    return(
        <div className="Settings">
            <main className="settings-main-container">
                <div className="settings-tabs-container">
                   <button className="settings-tabs selected-tab">Sources</button> 
                   <button className="settings-tabs selected-tab">Data</button> 
                   <button className="settings-tabs selected-tab">Users</button> 
                   <button className="settings-tabs selected-tab"></button> 
                </div>
                <div className="settings-tab-body"></div>
            </main>
        </div>
    );
}

export default Settings;
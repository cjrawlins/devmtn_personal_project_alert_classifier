module.exports = {
    addSource: async (req, res) => {
        console.log("Add Source Called");
        const db = req.app.get('db');
        let { enabled,
            nx_cameraid,
            name,
            ip,
            site,
            make,
            model,
            notes
        } = req.body;
        await db.create_source( [
            enabled,
            nx_cameraid,
            name,
            ip,
            site,
            make,
            model,
            notes
        ] );
        console.log(`New Source Added ${name} @ ${site}`);
        res.status(200).send("Source Added");
    }
}
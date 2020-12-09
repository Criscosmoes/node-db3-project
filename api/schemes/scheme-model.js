const db = require("../../data/db-config");

module.exports = {
  find() {
    return db("schemes");
  },
  findById(id) {
    return db("schemes").where("id", id).first();
  },
  findSteps(id) {
    return db("steps as s")
      .join("schemes", "schemes.id", "s.scheme_id")
      .select(
        "schemes.id",
        "schemes.scheme_name",
        "s.step_number",
        "s.instructions"
      )
      .where("s.scheme_id", id)
      .orderBy("s.step_number");

    /* SELECT
        schemes.id, 
        schemes.scheme_name, 
        s.step_number, 
        s.instructions
    FROM [Steps] as s
    JOIN [Schemes] as schemes
    ON schemes.id = s.scheme_id  
    WHERE s.scheme_id = 5
    ORDER BY s.step_number;  */
  },
  async add(scheme) {
    const newScheme = await db("schemes").insert(scheme);

    return db("schemes").where("id", newScheme);
  },
  update(changes, id) {
    return db("schemes").where("id", id).update(changes);
  },
  remove(id) {
    return db("schemes").where('id', id).del(); 
  },
};

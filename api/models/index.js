// Importer nos modèles
import { Card } from "./card.model.js";
import { List } from "./list.model.js";
import { Tag } from "./tag.model.js";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";
import { sequelize } from "./sequelize.client.js";


// List <--> Card (One-to-Many)
List.hasMany(Card, {
  as: "cards", 
  foreignKey: {
    name: "list_id",
    allowNull: false,
  },
  onDelete: "CASCADE"
});
Card.belongsTo(List, {
  as: "list",
  foreignKey: "list_id"
});

// Card <--> Tag (Many-to-Many)
Card.belongsToMany(Tag, {
  as: "tags",
  through: "card_has_tag",
  foreignKey: "card_id"
});

Tag.belongsToMany(Card, {
  as: "cards",
  through: "card_has_tag",
  foreignKey: "tag_id"
});

User.belongsTo(Role, {
  as: 'role',
  foreignKey: 'role_id'
})

Role.hasMany(User,{
  as: 'users',
  foreignKey: {
    name: 'role_id',
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

// Exporter nos modèles
export { Card, List, Tag, User, Role, sequelize };

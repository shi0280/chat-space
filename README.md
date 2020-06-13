# CHATーSPACE DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false, index: true, unique: true|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many  :groups,  through:  :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true||
|username|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :users,  through:  :users_groups


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
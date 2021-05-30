create table Users(
	uid serial not null,
	email text not null,
	password text not null,
	role text not null default 'user',
	is_verified boolean not null default false,
	constraint pk_uid primary key(uid)
);

create table UserDetails(
	ud_id serial not null,
	uid integer not null,
	name text not null,
	address text not null,
	phone_numb text not null,
	avatar text,
	constraint pk_ud_id primary key(ud_id),
	constraint fk_uid foreign key(uid) references Users(uid),
	constraint chk_phone check (char_length(phone_numb) <= 10)
);

create table FAQs(
	faq_id serial not null,
	uid integer not null,
	content jsonb not null,
	constraint pk_faq primary key(faq_id),
	constraint fk_uid foreign key(uid) references Users(uid)
);

create table Posts(
	post_id serial not null,
	uid integer not null,
	title text not null,
	content text not null,
	thumbnail text,
	vid_link text,
	post_time timestamp without time zone not null default now(),
	tags text[],
	favorites integer not null default 0,
	constraint pk_post primary key(post_id),
	constraint fk_uid foreign key(uid) references Users(uid)
);

create table Favorites(
	fav_id serial not null,
	post_id integer not null,
	uid integer not null,
	constraint pk_fav primary key(fav_id),
	constraint fk_post foreign key(post_id) references Posts(post_id),
	constraint fk_uid foreign key(uid) references Users(uid)
);

create table Quizzes(
	quiz_id serial not null,
	uid integer not null,
	title text not null,
	content jsonb not null,
	post_time timestamp without time zone not null default now(),
	constraint pk_quiz primary key(quiz_id),
	constraint fk_uid foreign key(uid) references Users(uid)
);

create table Reports(
	report_id serial not null,
	uid integer not null,
	reason text not null,
	report_time timestamp without time zone not null default now(),
	constraint pk_report primary key(report_id),
	constraint fk_uid foreign key(uid) references Users(uid)
);
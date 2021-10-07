User API Resources

All the student API router follows /student/

#	Routers	                        Verbs	  Progress	Is Private	Description
1	/student	                    GET	      Done	    Yes	        Get student Info
2	/student/register	            POST	  Done	    No	        Create a student
3	/student/login	                POST	  Done	    No	        Verify student Authentication and return JWT
4	/student/reset-password	        POST	  Done	    No	        Verify email and email pin to reset the password
5	/student/reset-password	        PATCH	  Done	    No	        Replace with new password
6	/student/logout	                DELETE	  Done	    Yes	        Delete student accessJWT
7	/student/updatestudent/:id	    PUT	  	  DONE      Yes	        Update student information

All the teacher API router follows /teacher/

#	Routers	                        Verbs	  Progress	Is Private	Description
1	/teacher	                    GET	      DONE	    Yes	        Get teacher Info
2	/teacher/register	            POST	  DONE	    No	        Create a teacher
3	/teacher/login	                POST	  DONE	    No	        Verify teacher Authentication and return JWT
4	/teacher/reset-password	        POST	  DONE	    No	        Verify email and email pin to reset the password
5	/teacher/reset-password	        PATCH	  DONE	    No	        Replace with new password
6	/teacher/logout	                DELETE	  DONE	    Yes	        Delete teacher accessJWT
7   /teacher/updateteacher/:id	    PUT	  	  DONE      Yes	        Update teacher information

Subjects API Resources
All the subject API router follows /subject/

#	Routers	                        Verbs	  Progress	Is Private	Description
1	/subject	                    GET	      DONE	    Yes	        Get subject Info
2	/subject/create	                POST	  DONE	    Yes	        Create a subject
7   /subject/updatesubject/:id	    PUT	  	  TODO      Yes	        Update subject information

Posts API Resources
All the user API router follows /post/

#	Routers	                        Verbs	  Progress	Is Private	Description
1	/post	                        GET	      TODO	    Yes	        Get all post for the logined in user
2	/post/{id}	                    GET	      TODO	    Yes	        Get a post details
3	/post	                        POST	  TODO	    Yes	        Create a new post
4	/post/{id}	                    PUT	      TODO	    Yes	        Update post details ie. reply message
5	/post/close-post/{id}           PATCH	  TODO	    Yes	        Update post status to close
6	/post/{id}	                    DELET	  TODO	    Yes	        Delete a post


Tokens API Resources
All the user API router follows /tokens

#	Routers	                        Verbs	Progress	Is Private	Description
1	/tokens	                        GET	    Done	    No	        Get a fresh student access JWT
1	/tokens/tchrs	                GET	    Done	    No	        Get a fresh teacher access JWT
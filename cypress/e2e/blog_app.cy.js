describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("")
    cy.request("POST", `${Cypress.config("BACKEND")}/testing/reset`)
    const user = {
      name: "test",
      username: "test",
      password: "test",
    }
    cy.request("POST", `${Cypress.config("BACKEND")}/users`, user)
    cy.visit("")
  })

  it("login form is shown", function () {
    cy.contains("login").click()
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  it("front page can be opened", function () {
    cy.contains("Blog")
    cy.contains("login")
  })

  describe("Login", function () {
    it("login succeeds with correct credentials", function () {
      cy.contains("login").click()
      cy.get("#username").type("test")
      cy.get("#password").type("test")
      cy.get("#login-button").click()

      cy.contains("test logged in")
    })

    it("login fails when wrong password", function () {
      cy.contains("login").click()
      cy.get("#username").type("test")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()
      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")

      cy.get("html").should("not.contain", "test logged in")
    })
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" })
    })

    it("login form can be opened", function () {
      cy.contains("test logged in")
    })

    it("a new blog can be created", function () {
      cy.contains("new blog").click()
      cy.get("#title").type("a blog created by cypress")
      cy.get("#author").type("cypress")
      cy.get("#url").type("www.cypress.com")
      cy.get("#create-blog-button").click()
      cy.contains("a blog created by cypress")
    })
  })

  describe("when a blog is created", function () {
    beforeEach(function () {
      // log in user test
      cy.login({ username: "test", password: "test" })
      // create a blog
      cy.createBlog({
        title: "a blog created by cypress",
        author: "cypress",
        url: "www.cypress.com",
      })
    })

    it("a blog can be full shown", function () {
      cy.contains("a blog created by cypress")
      cy.get(".show-hide-button").click()
      cy.contains("www.cypress.com")
    })

    it("a blog can be liked", function () {
      cy.get(".show-hide-button").click()
      cy.get(".like-button").click()
      cy.contains("1 likes")
    })

    it("a blog can be deleted by the owner user", function () {
      cy.get(".show-hide-button").click()
      cy.get(".delete-blog-button").click()
      cy.contains("a blog created by cypress").should("not.exist")
    })

    it("a blog can not be deleted by another user", function () {
      cy.contains("logout").click()
      const user = {
        name: "test2",
        username: "test2",
        password: "test2",
      }
      cy.request("POST", `${Cypress.config("BACKEND")}/users`, user)
      cy.login({ username: "test2", password: "test2" })
      cy.get(".show-hide-button").click()
      cy.get(".delete-blog-button").should("not.exist")
    })
  })

  describe("when multiple blogs are created", function () {
    beforeEach(function () {
      // log in user test
      cy.login({ username: "test", password: "test" })
      // create 3 blogs and display them
      for (let i = 0; i < 3; i++) {
        cy.createBlog({
          title: `blog ${i}`,
          author: `author ${i}`,
          url: `www.${i}.com`,
        })
      }
      // Display blogs
      cy.get(".show-hide-button").each((button) => {
        cy.wrap(button).click()
      })
    })

    it.only("blogs are ordered by likes", function () {
      // Like the blogs

      cy.get("[data-cy='blog 0']")
        .find(".like-button")
        .as("FirstBlogLikeButton")
      cy.get("[data-cy='blog 1']")
        .find(".like-button")
        .as("SecondBlogLikeButton")
      cy.get("[data-cy='blog 2']")
        .find(".like-button")
        .as("ThirdBlogLikeButton")

      for (let i = 0; i < 1; i++) {
        cy.get("@FirstBlogLikeButton").click()
        cy.wait(100)
      }

      for (let i = 0; i < 2; i++) {
        cy.get("@SecondBlogLikeButton").click()
        cy.wait(100)
      }

      for (let i = 0; i < 3; i++) {
        cy.get("@ThirdBlogLikeButton").click()
        cy.wait(100)
      }

      // Check the order is based on likes (descending)
      cy.get(".blog").eq(0).contains("blog 2")
      cy.get(".blog").eq(1).contains("blog 1")
      cy.get(".blog").eq(2).contains("blog 0")
    })
  })
})

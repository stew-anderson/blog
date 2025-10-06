---
layout: "post"
title: "Platform thinking as a growth strategy"
date: "2025-10-06 00:00:00 +0000"
description: "From APIs to AI: why platform thinking is both a business strategy and an architectural shift toward scalable, intelligent ecosystems."
img: "platform-thinking-as-a-growth-strategy.jpg"
tags: ["Strategy", "Growth", "AI", "Software Delivery"]
unsplashphotographer: "Reid Naaykens"
unsplashuser: "@reidnaa"
unsplashimage: "gray-metal-building-with-glass-windows-Wf_kNhZzL0A"
---

Most businesses sell products, platform businesses create ecosystems.

Product growth is linear: every new customer or feature requires effort; however, platform growth is exponential: every new participant adds value for everyone else.
Platform thinking in business terms means a mindset shift away from building products and moving towards enabling ecosystems. 

## From product to platform

If we think about the product lifecycle, it starts with an idea, a prototype, a few iterations, then hopefully we can introduce users, we have adoption. Eventually it matures to have market fit, the product is stable and well understood. This is the perfect time to ask the bigger question: 

> what if we allow others to build on what we've done for growth?

Platform thinking is a mindset shift, from delivering features to enabling ecosystems. It's about moving from linear value chains to network effects, where each participant contributes value that benefits everyone else.

## Real-world examples

One of the best examples is Microsoft, it went from selling boxes of software (remember them) to an Azure Cloud Platform + the MS 365 ecosystem, they opened up API's, created a massive developer marketplace, and transformed from product vendor to platform orchestrator.

Another example, Salesforce started as just a CRM software, when adding AppExchange platform with thousands of third-party apps, it's now an entire business application ecosystem.

## The hidden cost of being a platform

Platform thinking isn't just a business strategy, it's a fundamental shift in how you architect systems and that's an architectural commitment. When you build a product; you control the use cases. When you build a platform; you're designing for use cases you can't predict.

This changes everything:

**API design becomes product design.** Your internal REST endpoints weren't built for external eyes. They will expose implementation details, have inconsistent naming, lack proper versioning. Real platform APIs need contracts you can't break, extensive and comprehensive documentation, predictable rate limits, and abstractions that hide your messy internals.

**Data architecture needs multi-tenancy from day one.** That customer table with a simple `customer_id` ? Now you need to think about tenant isolation, cross-tenant analytics, and how third-party apps access data without creating security nightmares. Retrofitting multi-tenancy is painful, ask anyone who's done it.

**Infrastructure must handle unpredictable load patterns.** When partners build on your platform, you can't control when they hammer your APIs. You need sophisticated rate limiting, circuit breakers, quotas per tenant, and the ability to isolate noisy neighbours without taking down the whole system.

**Versioning becomes an long term contract.** Break an endpoint, and you break someone's business. You're now maintaining v1, v2, v3...v<sup>n</sup> simultaneously. Deployment pipelines needs to handle this. Monitoring needs to track metrics per API version. Your uptime now defines someone else's business continuity.

Opening up your platform introduces complexity, is the team ready for this? Because once you open the doors, you can't easily close them.

## Build vs buy – knowing where to draw the line

Once you commit to platform thinking, the next challenge is knowing what to build and what not to. Building a platform from scratch is a multi-year investment. The question isn't whether to use existing infrastructure, it's where to draw the line between what you should build and what is a commodity that you should buy.

> Build what differentiates you. Buy what scales you

**Almost always buy:**
* Auth/OAuth (e.g: [Auth0](https://auth0.com/), [Okta](https://www.okta.com/), [Keycloak](https://www.keycloak.org/)): You're not more secure than the specialists (unless security is your differentiator!).
* API gateways (e.g: [Kong](https://konghq.com/), [AWS API Gateway](https://aws.amazon.com/api-gateway/)): Rate limiting and key management are solved problems.
* Monitoring (e.g: [Grafana](https://grafana.com/), [DataDog](https://www.datadoghq.com/), [Prometheus](https://prometheus.io/)): You need visibility into what third parties are doing.
* Documentation platforms (e.g: [ReadMe](https://readme.com/), [Stoplight](https://stoplight.io/)): Auto-generated docs from OpenAPI specs.

**The gray zone:**
* Webhook infrastructure: Buy at small scale (e.g: Svix, Hookdeck), but if reliability/ordering is your differentiation, consider building.
* Developer portals: Most platforms can use off-the-shelf (Backstage, ReadMe). But if integration ease is a primary reason developers choose you over competitors, where the documentation and onboarding experience is part of why they win ([Stripe](https://docs.stripe.com/development) as a great example), then custom might be worth it. Would a merely "good" portal lose us developers? If no, buy it.
* Multi-tenancy architecture: Standard patterns (shared DB with tenant IDs, schema-per-tenant, database-per-tenant) handle most cases. Build custom only if you have extreme regulatory requirements or truly complex isolation needs - start simple!

**Almost always build:**
* Your core platform API's: This is your IP.
* Extension/plugin architecture: Too specific to your domain model.
* Ecosystem management: Partner onboarding and sandbox environments need to mirror your business.
* Data isolation and governance: Too tied to your compliance requirements.

## The payoff
Platforms outlast products. They create network effects, build moats and unlock innovation at the edges. You don't have to control everything, you just have to enable it. If you don't build platforms you risk becoming part of someone else's.

## Final thoughts on current AI developments in this area
Just as API's unlocked interoperability of services and accelerated platform growth, we're now entering the next phase with Anthropic's MCP (Model Context Protocol).

We're at a turning point where there is the potential for MCP to move us away from human-driven integrations to machine coordinated ones. Gone are the manual process and in return is the acceptance of allowing agents to understand, negotiate and act across platforms.

For businesses, that's both an opportunity and a threat. If your platform isn't ready to speak the same "language" as others in this emerging ecosystem, you risk being abstracted away by those that are.

We spent decades connecting systems. The next decade will be about connecting intelligence. But that and MCP is a whole other blog post...